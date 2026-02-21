import express from "express";
import authenticate from "../middleware.js";
import { addTask, deleteTask, editTask, getTask } from "../services/task.js";

const router = express.Router();

// POST /add-task - Thêm task mới (cần auth)
router.post("/add-task", authenticate, addTask);

// PUT /edit-task/:id - Chỉnh sửa task
router.put("/edit-task/:id", authenticate, editTask);

// GET /get-task/:id - Lấy thông tin một task
router.get("/get-task/:id", authenticate, getTask);

// DELETE /delete-task/:id - Xóa task
router.delete("/delete-task/:id", authenticate, deleteTask);

export default router;
