"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, db_1.connectDb)();
const JWT_KEY = process.env.JWT_KEY;
if (!JWT_KEY) {
    throw new Error("JSON web token key is not present");
}
app.post("/api/v1/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        await db_1.UserModel.create({
            username: username,
            password: password
        });
        res.json({
            "Message": "User Signed Up Successfully"
        });
    }
    catch (e) {
        res.status(401).json({
            "Message": "Sign Up failed"
        });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await db_1.UserModel.findOne({
        username: username,
        password: password
    });
    if (user) {
        const token = jsonwebtoken_1.default.sign({
            id: user._id
        }, JWT_KEY);
        res.json({
            "token": token
        });
    }
    else {
        res.status(401).json({
            "Message": "Invalid Credentials"
        });
    }
});
app.post("/api/v1/content", middleware_1.auth, async (req, res) => {
    const userId = req.userID;
    const type = req.body.type;
    const link = req.body.link;
    const title = req.body.title;
    const tags = req.body.tag;
    try {
        await db_1.ContentModel.create({
            title: title,
            type: type,
            userId: userId,
            link: link,
            tags: tags
        });
        res.json({
            "message": "content uploaded successfully"
        });
    }
    catch (e) {
        res.status(401).json({
            "message": "content upload failed"
        });
    }
});
app.get("/api/v1/content", middleware_1.auth, async (req, res) => {
    const userId = req.userID;
    const content = await db_1.ContentModel.find({
        userId: userId
    }).populate("userId", "username");
    res.json({
        content
    });
});
app.delete("/api/v1/content", middleware_1.auth, async (req, res) => {
    const userId = req.userID;
    const contentId = req.body.contentId;
    await db_1.ContentModel.deleteMany({
        _id: contentId,
        userId: userId,
    });
    res.json({
        "message": "content successfully deleted"
    });
});
app.listen(3000);
//# sourceMappingURL=index.js.map