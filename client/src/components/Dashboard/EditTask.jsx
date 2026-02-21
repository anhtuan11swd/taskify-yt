import axios from "axios";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";

const EditTask = ({ task, setEditTaskDiv, onTaskUpdated }) => {
  const [taskData, setTaskData] = useState({
    description: task?.description || "",
    priority: task?.priority || "thấp",
    status: task?.status || "chưa bắt đầu",
    title: task?.title || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:1000/api/v1/tasks/edit-task/${task._id}`,
        taskData,
        { withCredentials: true },
      );

      if (response.data.success) {
        alert("Task đã được cập nhật thành công!");
        setEditTaskDiv("none");
        // Gọi callback để cập nhật danh sách task
        if (onTaskUpdated) {
          onTaskUpdated();
        }
      } else {
        alert(`Lỗi: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật task:", error);
      alert("Có lỗi xảy ra khi cập nhật task. Vui lòng thử lại.");
    }
  };

  const handleClose = () => {
    setEditTaskDiv("none");
  };

  if (!task) return null;

  return (
    <div className="z-50 fixed inset-0 flex justify-center items-center bg-black/85">
      <div className="relative bg-white shadow-2xl p-6 rounded-xl w-full max-w-md">
        {/* Close Button */}
        <button
          aria-label="Đóng modal"
          className="top-4 right-4 absolute text-gray-500 hover:text-gray-700 cursor-pointer"
          onClick={handleClose}
          type="button"
        >
          <FaTimes size={20} />
        </button>

        {/* Title */}
        <h2 className="mb-6 font-bold text-gray-800 text-2xl">
          Chỉnh sửa Task
        </h2>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Task Title */}
          <div className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-700 text-sm"
              htmlFor="edit-title"
            >
              Tiêu đề
            </label>
            <input
              className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full placeholder:text-gray-400 transition-all duration-200"
              id="edit-title"
              name="title"
              onChange={handleChange}
              placeholder="Nhập tên nhiệm vụ"
              required
              type="text"
              value={taskData.title}
            />
          </div>

          {/* Priority */}
          <div className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-700 text-sm"
              htmlFor="edit-priority"
            >
              Độ ưu tiên
            </label>
            <select
              className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full transition-all duration-200 cursor-pointer"
              id="edit-priority"
              name="priority"
              onChange={handleChange}
              value={taskData.priority}
            >
              <option value="thấp">Thấp</option>
              <option value="trung bình">Trung bình</option>
              <option value="cao">Cao</option>
            </select>
          </div>

          {/* Status */}
          <div className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-700 text-sm"
              htmlFor="edit-status"
            >
              Trạng thái
            </label>
            <select
              className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full transition-all duration-200 cursor-pointer"
              id="edit-status"
              name="status"
              onChange={handleChange}
              value={taskData.status}
            >
              <option value="chưa bắt đầu">Chưa bắt đầu</option>
              <option value="đang thực hiện">Đang thực hiện</option>
              <option value="hoàn thành">Hoàn thành</option>
            </select>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label
              className="font-medium text-gray-700 text-sm"
              htmlFor="edit-description"
            >
              Mô tả
            </label>
            <textarea
              className="px-4 py-3 border border-gray-300 focus:border-blue-500 rounded-lg outline-none focus:ring-2 focus:ring-blue-200 w-full h-24 placeholder:text-gray-400 transition-all duration-200 resize-none"
              id="edit-description"
              name="description"
              onChange={handleChange}
              placeholder="Nhập chi tiết nội dung công việc"
              value={taskData.description}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              className="flex-1 bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded-lg font-semibold text-white transition-colors duration-200 cursor-pointer"
              type="submit"
            >
              Lưu thay đổi
            </button>
            <button
              className="flex-1 hover:bg-gray-100 px-4 py-3 border-2 border-black rounded-lg font-semibold text-black transition-colors duration-200 cursor-pointer"
              onClick={handleClose}
              type="button"
            >
              Hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
