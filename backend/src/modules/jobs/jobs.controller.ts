import { Request, Response } from "express";


export async function createJob(
  req: Request,
  res: Response
){

  res.status(201).json({
    message:"Job created"
  });

}