import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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

export const login = async (req, res) => {
  try {
    // Giải nén dữ liệu và kiểm tra tính hợp lệ
    const { email, password } = req.body;

    // Kiểm tra email và password có được nhập
    if (!email || !password) {
      return res.status(400).json({
        message: "Vui lòng nhập email và mật khẩu",
        success: false,
      });
    }

    // Tìm kiếm người dùng theo email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Email không tồn tại",
        success: false,
      });
    }

    // So sánh mật khẩu với bcrypt
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    // Tạo JWT token
    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "30d" },
    );

    // Thiết lập Cookie
    const cookieOptions = {
      httpOnly: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 ngày
      sameSite: "strict",
    };

    // Thêm secure chỉ khi ở production
    if (process.env.NODE_ENV === "production") {
      cookieOptions.secure = true;
    }

    res.cookie("taskify_user_token", token, cookieOptions);

    // Phản hồi thành công
    return res.status(200).json({
      message: "Login Success",
      success: true,
      token,
    });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error.message);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};

export const logout = async (_req, res) => {
  try {
    // Xóa cookie taskifyUserToken
    res.clearCookie("taskify_user_token");

    return res.status(200).json({
      message: "Logout Success",
      success: true,
    });
  } catch (error) {
    console.error("Lỗi đăng xuất:", error.message);
    return res.status(500).json({
      message: "Lỗi server",
      success: false,
    });
  }
};
