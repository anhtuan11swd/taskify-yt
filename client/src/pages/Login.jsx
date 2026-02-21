import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const change = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        values,
      );
      if (response.data.success) {
        alert("Đăng nhập thành công!");
        navigate("/");
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
            Đăng nhập với Taskify
          </h3>

          {/* Form đăng nhập */}
          <form className="flex flex-col gap-4" onSubmit={login}>
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
              <input
                className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full placeholder:text-gray-400 transition-all duration-200"
                id="password"
                name="password"
                onChange={change}
                placeholder="Nhập mật khẩu của bạn"
                required
                type="password"
                value={values.password}
              />
            </div>

            {/* Nút đăng nhập */}
            <button
              className="bg-blue-800 hover:bg-blue-700 mt-2 px-4 py-3 rounded-lg focus:ring-4 focus:ring-blue-200 w-full font-semibold text-white transition-all duration-200 cursor-pointer"
              type="submit"
            >
              Đăng nhập
            </button>
          </form>

          {/* Liên kết đến trang đăng ký */}
          <p className="mt-6 text-gray-600 text-center">
            Bạn chưa có tài khoản?{" "}
            <Link
              className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors duration-200 cursor-pointer"
              to="/register"
            >
              Đăng ký
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
