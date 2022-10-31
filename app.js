import express from "express";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
dotenv.config();
// middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 8000;

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: process.env.EMAIL,
    pass: process.env.WORD,
    clientId: process.env.OAUTH_CLIENTID,
    clientSecret: process.env.OAUTH_CLIENT_SECRET,
    refreshToken: process.env.OAUTH_REFRESH_TOKEN,
  },
});

transporter.verify((err, success) => {
  err
    ? console.log(err)
    : console.log(`=== server is ready to take message: ${success} ===`);
});

app.post("/send", (req, res) => {
  let mailOptions = {
    from: `${req.body.mailerState.email}`,
    to: process.env.EMAIL,
    subject: `${req.body.mailerState.subject}`,
    text: `${req.body.mailerState.message}`,
  };

  transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
      res.json({
        status: "failed",
      });
    } else {
      console.log("email sent successfully");
      res.json({ status: "success" });
    }
  });
});

app.listen(port, () => {
  console.log(`server running on port ${port}`);
});

export default app;
