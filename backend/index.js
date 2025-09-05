import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from "cloudinary";

import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";
import path from 'path';

dotenv.config();
const app = express();
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const __dirname = path.resolve();


const allowedOrigins = [
  "https://blog-app-chi-rosy-95.vercel.app"
]





app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});



app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);


app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: err.message || "Server Error" });
});

app.use(express.static(path.join(__dirname, '/frontend/dist')));

app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    process.exit(1);
  }
}

connectDB();
