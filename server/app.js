import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./connection.js";
import userRoutes from "./controllers/user.js";

dotenv.config();
connectDB();

const app = express();

// Cấu hình CORS: cho phép mọi origin (origin: true phản chiếu request origin, tương thích credentials)
const corsOptions = {
  credentials: true,
  origin: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/v1/users", userRoutes);

app.get("/", (_req, res) => res.send("Xin chào từ backend"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server đã khởi động tại cổng ${PORT}`);
});
