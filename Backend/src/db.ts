import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjectId= mongoose.Types.ObjectId;
import dotenv from "dotenv";
dotenv.config();



export const connectDb =async ()=>{
    const url = process.env.MONGO_CONNECTION;
    if(!url){
        throw new Error("MONGO URL is missing");
    }
    try{
        await mongoose.connect(url);
        console.log("MongoDB Connected");
    }catch(e){
        console.error("Mongo message: ",e);
        process.exit(1);
    }
}

const UserSchema = new Schema({
    username:{type:String , required:true , unique:true},
    password:{type:String , required:true}
})

const ContentType=["image","video","article","audio"]
const ContentSchema = new Schema({
   link:{type:String,required:true},
   type:{type:String,enum:ContentType,required:true},
   title:{type:String,required:true},
   tags:[{type:mongoose.Schema.Types.ObjectId, ref:'Tag'}],
   userId:{type:mongoose.Schema.Types.ObjectId, ref:'User',  required:true}
})

const TagsSchema = new Schema({
    title:{type:String,unique:true,required:true}
})

const LinkSchema = new Schema({
    hash:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId , ref:'User' , required:true, unique:true }
})
export const UserModel = mongoose.model("User",UserSchema);
export const ContentModel= mongoose.model("Content",ContentSchema);
export const TagModel = mongoose.model("Tag",TagsSchema);
export const LinkModel = mongoose.model("Link",LinkSchema);