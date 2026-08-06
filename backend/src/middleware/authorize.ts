import {
  Request,
  Response,
  NextFunction
} from "express";

import {
  userHasPermission
} from "../modules/auth/permission.service.js";


export function authorize(permission:string){

  return async (
    req:Request,
    res:Response,
    next:NextFunction
  ) => {


    if(!req.user){

      return res.status(401).json({
        message:"Unauthorized"
      });

    }


    const allowed =
      await userHasPermission(
        req.user.id,
        permission
      );


    if(!allowed){

      return res.status(403).json({
        message:"Forbidden"
      });

    }


    next();

  };

}