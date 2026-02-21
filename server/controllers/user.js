import express from "express";
import { register } from "../services/user.js";

const router = express.Router();

// Route đăng ký người dùng
router.post("/register", register);

export default router;
