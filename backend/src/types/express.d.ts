declare namespace Express {

 interface Request {

   user?:{

    id:string;

    permissions:string[];

   };

 }

}