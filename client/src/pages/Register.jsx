import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:1000/api/v1/users/register",
        values,
      );
      if (response.data.success) {
        alert("Đăng ký thành công! Chào mừng bạn đến với Taskify.");
        navigate("/login");
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Đã xảy ra lỗi. Vui lòng thử lại.";
      alert(message);
    }
  };

  return (
    <div className="flex justify-center items-center bg-gray-50 px-4 w-full min-h-screen">
      <div className="w-full max-w-[60vw] sm:max-w-[45vw] md:max-w-[30vw]">
        <div className="bg-white shadow-lg p-8 border border-gray-100 rounded-2xl">
          {/* Tiêu đề Taskify */}
          <h1 className="mb-2 font-bold text-blue-600 text-3xl text-center">
            Taskify
          </h1>

          {/* Tiêu đề phụ */}
          <h3 className="mb-8 text-gray-600 text-lg text-center">
            Đăng ký với Taskify
          </h3>

          {/* Form đăng ký */}
          <form className="flex flex-col gap-4" onSubmit={register}>
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label
                className="font-medium text-gray-700 text-sm"
                htmlFor="username"
              >
                Tên người dùng
              </label>
              <input
                className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full placeholder:text-gray-400 transition-all duration-200"
                id="username"
                name="username"
                onChange={change}
                placeholder="Nhập tên người dùng của bạn"
                required
                type="text"
                value={values.username}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <label
                className="font-medium text-gray-700 text-sm"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full placeholder:text-gray-400 transition-all duration-200"
                id="email"
                name="email"
                onChange={change}
                placeholder="Nhập email của bạn"
                required
                type="email"
                value={values.email}
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                className="font-medium text-gray-700 text-sm"
                htmlFor="password"
              >
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  className="px-4 py-3 pr-11 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full placeholder:text-gray-400 transition-all duration-200"
                  id="password"
                  name="password"
                  onChange={change}
                  placeholder="Nhập mật khẩu của bạn"
                  required
                  type={showPassword ? "text" : "password"}
                  value={values.password}
                />
                <button
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-200"
                  onClick={() => setShowPassword((prev) => !prev)}
                  type="button"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Nút đăng ký */}
            <button
              className="bg-blue-800 hover:bg-blue-700 mt-2 px-4 py-3 rounded-lg focus:ring-4 focus:ring-blue-200 w-full font-semibold text-white transition-all duration-200 cursor-pointer"
              type="submit"
            >
              Đăng ký
            </button>
          </form>

          {/* Liên kết đến trang đăng nhập */}
          <p className="mt-6 text-gray-600 text-center">
            Bạn đã có tài khoản?{" "}
            <Link
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer"
              to="/login"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
