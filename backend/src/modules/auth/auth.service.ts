import bcrypt from "bcrypt";

import { prisma } from "../../lib/prisma.js";


interface RegisterInput {

    companyName:string;

    firstName:string;

    lastName:string;

    email:string;

    password:string;

}



export async function register(
    data:RegisterInput
    ){


    const existingUser =
    await prisma.user.findUnique({

    where:{
    email:data.email
    }

});


if(existingUser){

    throw new Error(
    "Email already registered"
    );

}



const ownerRole =
    await prisma.role.findFirst({

    where:{
    name:"Owner",
    companyId:null
    }

});


if(!ownerRole){

    throw new Error(
    "Owner role missing"
    );

}



const passwordHash =
    await bcrypt.hash(
    data.password,
    10
);



const result =
await prisma.$transaction(async(tx)=>{


    const company =
    await tx.company.create({

    data:{
    name:data.companyName
    }

});



const user =
    await tx.user.create({

    data:{

    email:data.email,

    firstName:data.firstName,

    lastName:data.lastName,

    passwordHash,

    companyId:company.id

    }

});



await tx.userRole.create({

    data:{

    userId:user.id,

    roleId:ownerRole.id

    }

});



return {

    company,

    user

};


});


    return result;

}