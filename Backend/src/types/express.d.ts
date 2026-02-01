import { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";

declare global {
  namespace Express {
    interface Request {
      userID?: string | Types.ObjectId;
      id?:string | JwtPayload
    }
  }
}