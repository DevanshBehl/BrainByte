import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import { connectDb , UserModel , TagModel, ContentModel , LinkModel} from "./db";
import { auth } from "./middleware";
import mongoose from "mongoose";
const app = express();
app.use(express.json());
connectDb();
const JWT_KEY=process.env.JWT_KEY;
if(!JWT_KEY){
    throw new Error("JSON web token key is not present");
}
app.post("/api/v1/signup",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    try{
        await UserModel.create({
            username:username,
            password:password
        })
        res.json({
            "Message":"User Signed Up Successfully"
        })
    }catch(e){
        res.status(401).json({
            "Message":"Sign Up failed"
        })

    }
});
app.post("/api/v1/signin",async (req,res)=>{
    const username= req.body.username;
    const password= req.body.password;
    const user = await UserModel.findOne({
        username:username,
        password:password
    })
    if(user){
        const token = jwt.sign({
            id:user._id
        },JWT_KEY)

        res.json({
            "token":token
        })
    }else{
        res.status(401).json({
            "Message":"Invalid Credentials"
        })
    }
})
app.post("/api/v1/content",auth,async (req,res)=>{
    const userId = req.userID as mongoose.Types.ObjectId;
    const type = req.body.type;
    const link = req.body.link;
    const title = req.body.title;
    const tags = req.body.tag as mongoose.Types.ObjectId[];
    try{
        await ContentModel.create({
        title:title,
        type:type,
        userId:userId,
        link:link,
        tags:tags
        })
        res.json({
            "message":"content uploaded successfully"
        })
    }catch(e){
        res.status(401).json({
            "message":"content upload failed"
        })
    }
})


app.get("/api/v1/content",auth,async (req,res)=>{
    const userId = req.userID as mongoose.Types.ObjectId;
    const content = await ContentModel.find({
        userId:userId
    }).populate("userId","username");
    res.json({
        content
    })
})

app.delete("/api/v1/content",auth,async (req,res)=>{
    const userId=req.userID as mongoose.Types.ObjectId;
    const contentId=req.body.contentId;
    await ContentModel.deleteMany({
        _id:contentId,
        userId:userId,
    })
    res.json({
        "message":"content successfully deleted"
    })
})

app.listen(3000);