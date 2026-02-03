import dotenv from "dotenv";
dotenv.config();
import express from "express";
import jwt from "jsonwebtoken";
import { connectDb , UserModel , TagModel, ContentModel , LinkModel} from "./db";
import { auth } from "./middleware";
import mongoose from "mongoose";
import { random } from "./utils";
import { hash } from "crypto";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors())

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

app.post("/api/v1/brain/share",auth,async (req,res)=>{
    const share = req.body.share;
    const userId = req.userID as mongoose.Types.ObjectId;
    
    if(share){
        try{
            const hash = random(20);
            await LinkModel.create({
            hash: hash,
            userId:userId

        })
        res.json({
        "message":"Updated shareable link",
        "hash":hash
    })}catch(e){
        res.status(411).json({
            "message":"sharelink already exist"
        })
    }
    }else{
        await LinkModel.deleteOne({
            userId:userId
        })
        res.json({
            "message":"disabled sharing"
        })
    }
})

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  try {
    const hash = req.params.shareLink;

    const link = await LinkModel
      .findOne({ hash })
      .populate("userId", "username");

    if (!link) {
      return res.status(404).json({ message: "Invalid share link" });
    }

    res.json({ link });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});
app.listen(3000);