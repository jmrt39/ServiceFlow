import {
Request,
Response
} from "express";


import {
register
} from "./auth.service.js";


import {
registerSchema
} from "./auth.validation.js";


import {
generateToken
} from "./jwt.service.js";



export async function registerUser(
    req:Request,
    res:Response
){

    try{


    const data =
    registerSchema.parse(
    req.body
    );



    const result =
    await register(data);



    const token =
    generateToken({

    id:result.user.id,

    companyId:
    result.company.id

    });



    res.status(201).json({

        message:
        "Registration successful",

        token,

        user:{

        id:result.user.id,

        email:result.user.email,

        companyId:result.company.id

    }

    });


    }

    catch(error){


         console.error("REGISTRATION ERROR:", error);

        res.status(400).json({
            message: error instanceof Error
            ? error.message
            : "Registration failed"
        });


    }

}