import { Request,Response,NextFunction } from "express"
import jwt, { decode } from "jsonwebtoken";
import mongoose from "mongoose";
const JWT_KEY = process.env.JWT_KEY;
if(!JWT_KEY){
    throw new Error("Json web token key is missing");
}
interface authpaylaod{
    id: string;
}
export const auth=async (req :Request, res : Response,next : NextFunction)=>{
    try{
        const token = req.headers.token;
        const decoded = jwt.verify(token as string,JWT_KEY) as authpaylaod;
        if(decoded){
            req.userID= decoded.id;
            next();
        }
    }catch(e){
        res.status(401).json({
            "message":"user not authenticated"
        })
    }
}