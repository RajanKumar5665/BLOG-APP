import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from "cloudinary";
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoute from "./routes/user.route.js";
import blogRoute from "./routes/blog.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: [
    'https://blog-app-git-main-rajan-mandals-projects.vercel.app',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Server is running',
  });
});

app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);



app.use((req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    success: false, 
    message: err.message || "Internal Server Error"
  });
});

const startServer = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error.message);
    process.exit(1);
  }
};

startServer();