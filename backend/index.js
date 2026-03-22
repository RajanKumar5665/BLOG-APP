import express from 'express';
import dotenv from 'dotenv';
import mongoose, { mongo } from 'mongoose';
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


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: [
    process.env.FRONTEND_URL, // Keep for local development
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));



cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_SECRET_KEY,
});



app.use("/api/users", userRoute);
app.use("/api/blogs", blogRoute);



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connect(MONGODB_URI, {
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));


