import axios from "axios";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Header = ({ setAddTaskDiv }) => {
  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await axios.post(
        "http://localhost:1000/api/v1/users/logout",
        {},
        { withCredentials: true },
      );
      localStorage.removeItem("userLoggedIn");
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  return (
    <header className="top-0 right-0 left-0 z-50 fixed flex justify-between items-center bg-white px-6 border-gray-200 border-b h-16">
      {/* App Name */}
      <h1 className="font-bold text-blue-600 text-2xl">Taskify</h1>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Add Task Button */}
        <button
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-medium text-white transition-colors duration-200 cursor-pointer"
          onClick={() => setAddTaskDiv("block")}
          type="button"
        >
          <FaPlus size={14} />
          <span>Thêm Task</span>
        </button>

        {/* Logout Button */}
        <button
          aria-label="Đăng xuất"
          className="hover:bg-red-50 p-2 rounded-lg text-gray-600 hover:text-red-600 transition-colors duration-200 cursor-pointer"
          onClick={logOut}
          type="button"
        >
          <FaSignOutAlt size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
