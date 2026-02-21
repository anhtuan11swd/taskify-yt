import Task from "../models/task.js";

// Thêm tác vụ mới
export const addTask = async (req, res) => {
  try {
    const { title, description, priority, status } = req.body;
    const user = req.user;

    // Validation: Kiểm tra title và description không trống, tối thiểu 6 ký tự
    if (!title || title.length < 6) {
      return res.status(400).json({
        message: "Tiêu đề phải có ít nhất 6 ký tự",
        success: false,
      });
    }

    if (!description || description.length < 6) {
      return res.status(400).json({
        message: "Mô tả phải có ít nhất 6 ký tự",
        success: false,
      });
    }

    // Tạo task mới
    const newTask = new Task({
      description,
      priority: priority || "thấp",
      status: status || "chưa bắt đầu",
      title,
    });

    // Lưu vào database
    await newTask.save();

    // Cập nhật mảng tasks của user
    user.tasks.push(newTask._id);
    await user.save();

    return res.status(201).json({
      message: "Thêm task thành công",
      success: true,
      task: newTask,
    });
  } catch (error) {
    console.error("Lỗi thêm task:", error.message);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Chỉnh sửa tác vụ
export const editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    // Tìm và cập nhật task
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { description, priority, status, title },
      { new: true, runValidators: true },
    );

    if (!updatedTask) {
      return res.status(404).json({
        message: "Không tìm thấy task",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Cập nhật task thành công",
      success: true,
      task: updatedTask,
    });
  } catch (error) {
    console.error("Lỗi cập nhật task:", error.message);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Lấy thông tin một tác vụ
export const getTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);

    if (!task) {
      return res.status(404).json({
        message: "Không tìm thấy task",
        success: false,
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Lỗi lấy task:", error.message);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

// Xóa tác vụ
export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({
        message: "Không tìm thấy task",
        success: false,
      });
    }

    // Xóa task khỏi mảng tasks của user
    const user = req.user;
    user.tasks = user.tasks.filter((taskId) => taskId.toString() !== id);
    await user.save();

    return res.status(200).json({
      message: "Xóa task thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi xóa task:", error.message);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};
