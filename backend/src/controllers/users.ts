import { Request, Response } from "express";
import bcrypt from 'bcrypt'
import { UserModel } from "../models/user";
import { Users } from "../models/schema";
import * as jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
const signin = async (req: Request, res:Response) => {
    try {
        const data:UserModel = req.body;
        if(await checkPassword(data.username, data.password)){
            const payload = {
                name:data.firstname,
                username: data.username,
                role:data.role
              }
              const token = jwt.sign(payload,process.env.JWT_SECRET_TOKEN as string,{
                expiresIn: '1h'
            });
            res.status(200).json({status:'s', code:'token', data:token});
            
        }else{
            res.status(200).json({status:'e', code:'ERROR.LOGINFAIL'});    
        }
    }catch(error) {
        res.status(500).json({status:'e', code:'', message:error});    
    }
}

const register = async (req: Request, res:Response) => {
    try {
        const data:UserModel = req.body;
        if(await checkExistUser(data.username)){
            res.status(200).send({status:'e', code:'UserExist'});
        }else {
            data.password = await hashPassword(data.password);
            const newUser = new Users(data);
            await newUser.save();
            res.status(201).send({status:'s', code:'success'});
        }
    }catch(error) {
        console.log(error)
        res.status(500).json(error);  
    }
}

const signout = (req: Request, res:Response) => {

}

async function checkExistUser(username:string) {
    return (await Users.find({username})).length >0;
}
async function hashPassword(password:string){
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const passWordHash = bcrypt.hash(password, salt);
    return passWordHash;
}
async function checkPassword(username: string, password: string){
    try{
        const user = (await Users.findOne({username}));
        if(user){
            const passwordHash = user!.password as string;
            const isPassCorrect = bcrypt.compare(password, passwordHash);
            return isPassCorrect;
        }
    }catch(error: any){
        throw new Error(error);
    }
}



export {signin, signout, register}
