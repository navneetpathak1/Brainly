"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./db");
const middleware_1 = require("./middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(" req.body =", req.body);
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res
                .status(400)
                .json({ error: "Username and password are required." });
        }
        const existingUser = yield db_1.userModel.findOne({ userName });
        if (existingUser) {
            return res.status(409).json({ error: "Username already taken." });
        }
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        const user = yield db_1.userModel.create({
            userName,
            password: hashedPassword,
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id, userName: user.userName }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.status(201).json({
            message: "User created successfully",
            token
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, password } = req.body;
        if (!userName || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = yield db_1.userModel.findOne({ userName });
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist" });
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jsonwebtoken_1.default.sign({ id: existingUser._id, userName: existingUser.userName }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return res.status(200).json({
            message: "Login successful",
            token
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
}));
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { link, title, tags } = req.body;
        if (!link || !title) {
            return res.status(400).json({ message: "Link and title are required" });
        }
        const content = yield db_1.contentModel.create({
            link,
            title,
            userId: req.userId,
            tags: tags || []
        });
        res.status(201).json({
            message: "Content added successfully",
            content
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.userId) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        const content = yield db_1.contentModel.find({ userId: req.userId }).populate("userId", "userName");
        res.json({
            message: "Content fetched successfully",
            content,
        });
    }
    catch (err) {
        console.error("Error fetching content:", err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
app.get("/api/v1/content", (req, res) => { });
app.post("/api/v1/brain/share", (req, res) => { });
app.get("/api/v1/brain/:shareLink", (req, res) => { });
app.listen(3000, () => {
    console.log("Server in running");
});
