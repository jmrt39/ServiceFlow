import jwt from "jsonwebtoken";


export function generateToken(
    payload:{
    id:string;
    companyId:string;
    }
    ){

    return jwt.sign(

        payload,

        process.env.JWT_SECRET!,

        {
        expiresIn:"7d"
        }

    );

}