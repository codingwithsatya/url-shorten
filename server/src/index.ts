import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import urlShortnerRoute from "./routes/urlShortnerRoute";
import cors from "cors";

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
app.use(
  cors({
    origin: "https://url-shorten-ui.onrender.com",
  })
);
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use("/api", urlShortnerRoute);

app.listen(port, () => {
  dbConnect();
  console.log("Backend server is running");
});
