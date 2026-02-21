import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./connection.js";
import userRoutes from "./controllers/user.js";

dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/users", userRoutes);

app.get("/", (_req, res) => res.send("Xin chào từ backend"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đã khởi động tại cổng ${PORT}`);
});
