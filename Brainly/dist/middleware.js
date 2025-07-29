"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userMiddleware = (req, res, next) => {
    try {
        const header = req.headers["authorization"];
        if (!header) {
            return res.status(403).json({ message: "You are not logged in" });
        }
        const token = header.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (!decoded || !decoded.id) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.userId = decoded.id;
        next();
    }
    catch (err) {
        console.error("JWT verification error:", err);
        res.status(403).json({ message: "Invalid or expired token" });
    }
};
exports.userMiddleware = userMiddleware;
