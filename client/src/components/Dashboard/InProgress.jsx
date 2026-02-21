import axios from "axios";
import { useEffect, useState } from "react";
import StackTitle from "./StackTitle";
import TaskCard from "./TaskCard";

const InProgress = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/tasks", {
          withCredentials: true,
        });
        if (!cancelled && response.data.success) {
          const filteredTasks = response.data.tasks.filter(
            (task) => task.status === "đang thực hiện",
          );
          setTasks(filteredTasks);
        }
      } catch (error) {
        if (!cancelled) {
          console.error("Lỗi khi lấy danh sách task:", error);
        }
      }
    };

    fetchTasks();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleDelete = async (taskId) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa task này?")) return;

    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v1/tasks/delete-task/${taskId}`,
        { withCredentials: true },
      );
      if (response.data.success) {
        setTasks(tasks.filter((task) => task._id !== taskId));
      }
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
    }
  };

  const handleEdit = (task) => {
    console.log("Chỉnh sửa task:", task);
  };

  return (
    <div>
      <StackTitle color="blue" count={tasks.length} title="Đang thực hiện" />
      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="py-4 text-blue-400 text-sm text-center">
            Chưa có task nào đang thực hiện
          </p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task._id}
              onDelete={handleDelete}
              onEdit={handleEdit}
              task={task}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default InProgress;
