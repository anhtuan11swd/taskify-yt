import express from "express";
import { login, logout, register } from "../services/user.js";

const router = express.Router();

// Route đăng ký người dùng
router.post("/register", register);

// Route đăng nhập người dùng
router.post("/login", login);

// Route đăng xuất người dùng
router.post("/logout", logout);

export default router;
