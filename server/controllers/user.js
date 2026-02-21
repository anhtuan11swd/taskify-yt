import express from "express";
import authenticate from "../middleware.js";
import { getUserDetails, login, logout, register } from "../services/user.js";

const router = express.Router();

// Route đăng ký người dùng
router.post("/register", register);

// Route đăng nhập người dùng
router.post("/login", login);

// Route đăng xuất người dùng
router.post("/logout", logout);

// Route lấy thông tin chi tiết người dùng
router.get("/user-details", authenticate, getUserDetails);

export default router;
