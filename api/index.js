import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO URI:", process.env.MONGO); // Add this
const URL = process.env.MONGO;

mongoose
  .connect(URL)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});
