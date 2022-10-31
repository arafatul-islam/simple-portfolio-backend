import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});
