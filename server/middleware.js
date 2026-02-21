import jwt from "jsonwebtoken";
import User from "./models/user.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.taskify_user_token;

    if (!token) {
      return res.status(401).json({ message: "Yêu cầu xác thực" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    req.user = user;
    next();
  } catch (_error) {
    res.status(401).json({ message: "Token không hợp lệ" });
  }
};

export default authenticate;
