import express from "express";

const app = express();

app.get("/", (_req, res) => res.send("Xin chào từ backend"));

app.listen(1000, () => {
  console.log("Máy chủ đã khởi động");
});
