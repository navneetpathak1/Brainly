import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { contentModel, userModel } from "./db";
import { userMiddleware } from "./middleware";
import { json } from "body-parser";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/v1/signup", async (req, res) => {
  try {
    // console.log(" req.body =", req.body);
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required." });
    }

    const existingUser = await userModel.findOne({ userName });
    if (existingUser) {
      return res.status(409).json({ error: "Username already taken." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      userName,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: user._id, userName: user.userName },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User created successfully",
      token 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/v1/signin", async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await userModel.findOne({ userName });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password as string);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: existingUser._id, userName: existingUser.userName },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      message: "Login successful",
      token
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});


app.post("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { link, title, tags } = req.body;

    if (!link || !title) {
      return res.status(400).json({ message: "Link and title are required" });
    }

    const content = await contentModel.create({
      link,
      title,
      userId: req.userId,
      tags: tags || [] 
    });

    res.status(201).json({
      message: "Content added successfully",
      content
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    if (!req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const content = await contentModel.find({ userId: req.userId }).populate("userId", "userName");

    res.json({
      message: "Content fetched successfully",
      content,
    });
  } catch (err) {
    console.error("Error fetching content:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});


app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    const { contentId } = req.body;

    if (!contentId) {
      return res.status(400).json({ message: "Content ID is required" });
    }

    const deletedContent = await contentModel.findOneAndDelete({
      _id: contentId,
      userId: req.userId,
    });

    if (!deletedContent) {
      return res.status(404).json({ message: "Content not found or not authorized" });
    }

    res.json({ message: "Content deleted successfully" });
  } catch (err) {
    console.error("Error deleting content:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/v1/brain/share", (req, res) => {});

app.get("/api/v1/brain/:shareLink", (req, res) => {});

app.listen(3000, () => {
  console.log("Server in running");
});
