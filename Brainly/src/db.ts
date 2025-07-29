import mongoose, { model, Schema } from "mongoose";

import env from "dotenv";

env.config();

mongoose
  .connect(
    "mongodb://localhost:27017/"
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
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

export const contentModel = model('Content', contentSchema);


