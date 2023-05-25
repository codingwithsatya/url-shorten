import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import urlShortnerRoute from "./routes/urlShortnerRoute";

const app = express();
dotenv.config();
const port = process.env.PORT;
const MONGO_URI = process.env.MONGO;

// Connect to MongoDB
const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO!);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    throw error;
  }
};

app.use(express.json());
// app.use(cors());

app.use("/api", urlShortnerRoute);

app.listen(port, () => {
  dbConnect();
  console.log("Backend server is running");
});
