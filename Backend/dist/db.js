"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.TagModel = exports.ContentModel = exports.UserModel = exports.connectDb = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ObjectId = mongoose_1.default.Types.ObjectId;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const connectDb = async () => {
    const url = process.env.MONGO_CONNECTION;
    if (!url) {
        throw new Error("MONGO URL is missing");
    }
    try {
        await mongoose_1.default.connect(url);
        console.log("MongoDB Connected");
    }
    catch (e) {
        console.error("Mongo message: ", e);
        process.exit(1);
    }
};
exports.connectDb = connectDb;
const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const ContentType = ["image", "video", "article", "audio"];
const ContentSchema = new Schema({
    link: { type: String, required: true },
    type: { type: String, enum: ContentType, required: true },
    title: { type: String, required: true },
    tags: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
const TagsSchema = new Schema({
    title: { type: String, unique: true, required: true }
});
const LinkSchema = new Schema({
    hash: { type: String, required: true },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true }
});
exports.UserModel = mongoose_1.default.model("User", UserSchema);
exports.ContentModel = mongoose_1.default.model("Content", ContentSchema);
exports.TagModel = mongoose_1.default.model("Tag", TagsSchema);
exports.LinkModel = mongoose_1.default.model("Link", LinkSchema);
//# sourceMappingURL=db.js.map