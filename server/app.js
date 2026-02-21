import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();

app.get("/", (_req, res) => res.send("Xin chào từ backend"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đã khởi động tại cổng ${PORT}`);
});
