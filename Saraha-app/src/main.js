import dotenv from "dotenv";
import express from "express";
import path from "path";
import { connectDB } from "./DB/connection.db.js";
import authRouter from "./module/auth/auth.controller.js";
import messageRouter from "./module/message/message.controller.js";


dotenv.config({ path: path.resolve(".env.dev") });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/messages", messageRouter);

// Database Connection & Start Server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} 🚀`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
  });