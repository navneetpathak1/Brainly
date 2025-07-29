import { NextFunction, Request, Response } from "express";
import Jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers["authorization"];

    if (!header) {
      return res.status(403).json({ message: "You are not logged in" });
    }

    const token = header.split(" ")[1]; 
    const decoded = Jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    if (!decoded || !decoded.id) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT verification error:", err);
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
