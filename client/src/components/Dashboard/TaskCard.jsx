import { FaEdit, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const priorityColors = {
    cao: {
      bg: "bg-red-100",
      border: "border-red-200",
      text: "text-red-600",
    },
    thấp: {
      bg: "bg-green-100",
      border: "border-green-200",
      text: "text-green-600",
    },
    "trung bình": {
      bg: "bg-yellow-100",
      border: "border-yellow-200",
      text: "text-yellow-600",
    },
  };

  const priorityConfig = priorityColors[task.priority] || priorityColors.thấp;

  const getPriorityLabel = (priority) => {
    switch (priority) {
      case "cao":
        return "Cao";
      case "trung bình":
        return "Trung bình";
      case "thấp":
        return "Thấp";
      default:
        return "Thấp";
    }
  };

  return (
    <div className="group relative bg-white hover:bg-gray-50 shadow-sm hover:shadow-md mb-3 p-4 border border-gray-200 hover:border-gray-300 rounded-lg w-full transition-all hover:-translate-y-0.5 duration-200 ease-in-out transform">
      <button
        className="w-full text-left cursor-pointer pr-16"
        onClick={() => onEdit?.(task)}
        type="button"
      >
        <h4 className="font-semibold text-gray-800 group-hover:text-gray-900 text-sm transition-colors duration-150">
          {task.title}
        </h4>

        {task.description && (
          <p className="mt-2 text-gray-500 text-xs line-clamp-2 leading-relaxed">
            {task.description}
          </p>
        )}

        <div className="flex justify-between items-center mt-3">
          <span
            className={`px-2.5 py-1 rounded-md text-xs font-medium ${priorityConfig.bg} ${priorityConfig.text}`}
          >
            {getPriorityLabel(task.priority)}
          </span>
          <span className="text-gray-400 text-xs">
            {task.createdAt
              ? new Date(task.createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })
              : "Chưa có ngày"}
          </span>
        </div>
      </button>

      <div className="absolute top-4 right-4 flex gap-1">
        <button
          aria-label="Chỉnh sửa task"
          className="hover:bg-blue-50 p-1.5 rounded-md text-gray-400 hover:text-blue-600 transition-all duration-150"
          onClick={() => onEdit?.(task)}
          type="button"
        >
          <FaEdit size={14} />
        </button>
        <button
          aria-label="Xóa task"
          className="hover:bg-red-50 p-1.5 rounded-md text-gray-400 hover:text-red-600 transition-all duration-150"
          onClick={() => onDelete?.(task._id)}
          type="button"
        >
          <FaTrash size={14} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
