import express from "express";
import { login, register } from "../services/user.js";

const router = express.Router();

// Route đăng ký người dùng
router.post("/register", register);

// Route đăng nhập người dùng
router.post("/login", login);

export default router;
