import mongoose, { model, Schema } from "mongoose";

import env from "dotenv";

env.config();

mongoose
  .connect(
    process.env.MONGODB_URL || ""
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const userSchema = new Schema({
  userName: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

export const userModel = model("User", userSchema);

const contentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  type: String,
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});


const linkSchema = new Schema({
  hash: {type: String, unique: true},
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true},
})

export const contentModel = model('Content', contentSchema);

export const linkModel = model("Links", linkSchema);

