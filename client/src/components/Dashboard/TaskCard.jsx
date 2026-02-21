import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColors = {
    cao: "bg-red-100 text-red-700",
    thấp: "bg-green-100 text-green-700",
    "trung bình": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="bg-white shadow-sm hover:shadow-md mb-3 p-4 border border-gray-200 rounded-lg transition-shadow duration-200 cursor-pointer">
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-gray-800 text-sm">{task.title}</h4>
        <div className="flex gap-2">
          <button
            aria-label="Chỉnh sửa task"
            className="p-1 text-gray-400 hover:text-blue-500 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.(task);
            }}
            type="button"
          >
            <FaEdit size={14} />
          </button>
          <button
            aria-label="Xóa task"
            className="p-1 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(task._id);
            }}
            type="button"
          >
            <FaTrash size={14} />
          </button>
        </div>
      </div>

      {task.description && (
        <p className="mt-2 text-gray-500 text-xs line-clamp-2">
          {task.description}
        </p>
      )}

      <div className="flex justify-between items-center mt-3">
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            priorityColors[task.priority] || priorityColors.thấp
          }`}
        >
          {task.priority === "cao"
            ? "Cao"
            : task.priority === "trung bình"
              ? "Trung bình"
              : "Thấp"}
        </span>
        <span className="text-gray-400 text-xs">
          {task.createdAt
            ? new Date(task.createdAt).toLocaleDateString("vi-VN")
            : "Chưa có ngày"}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
