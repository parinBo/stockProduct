import { NextFunction, Request, Response } from "express";
import * as jsonwebtoken   from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try{
    const authorize  = req.headers.authorization;
    if(authorize){
      jsonwebtoken.verify(authorize+'',process.env.JWT_SECRET_TOKEN+'',function(err, decoded: any) {
        if(decoded?.username || !err){
          next();
        }else{
          return res.status(401).json({error: 'UNAUTHORIZE'})
        }
      })
    }else{
      return res.status(401).send('Unauthorized');
    }
  }catch(e:any){
    return res.status(500).send('');
  }

};