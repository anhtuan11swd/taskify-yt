import bcrypt from "bcryptjs";
import User from "../models/user.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra các trường bắt buộc
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "Vui lòng điền đầy đủ thông tin",
        success: false,
      });
    }

    // Kiểm tra độ dài dữ liệu
    if (username.length < 5) {
      return res.status(400).json({
        message: "Username phải có ít nhất 5 ký tự",
        success: false,
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password phải có ít nhất 6 ký tự",
        success: false,
      });
    }

    // Kiểm tra người dùng đã tồn tại chưa
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Username hoặc email đã tồn tại",
        success: false,
      });
    }

    // Mã hóa mật khẩu
    const hashPass = await bcrypt.hash(password, 10);

    // Tạo người dùng mới
    const newUser = new User({
      email,
      password: hashPass,
      username,
    });

    // Lưu vào database
    await newUser.save();

    // Phản hồi thành công
    return res.status(201).json({
      message: "Đăng ký thành công",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đăng ký:", error.message);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};
