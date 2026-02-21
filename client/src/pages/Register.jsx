import { Link } from "react-router-dom";

const Register = () => {
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
          <form className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <label
                className="font-medium text-gray-700 text-sm"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full placeholder:text-gray-400 transition-all duration-200"
                id="username"
                name="username"
                placeholder="Nhập tên người dùng của bạn"
                required
                type="text"
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
                placeholder="Nhập email của bạn"
                required
                type="email"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <label
                className="font-medium text-gray-700 text-sm"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full placeholder:text-gray-400 transition-all duration-200"
                id="password"
                name="password"
                placeholder="Nhập mật khẩu của bạn"
                required
                type="password"
              />
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
