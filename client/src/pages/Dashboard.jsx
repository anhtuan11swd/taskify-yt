import axios from "axios";
import { useEffect, useState } from "react";
import AddTask from "../components/Dashboard/AddTask";
import Completed from "../components/Dashboard/Completed";
import EditTask from "../components/Dashboard/EditTask";
import Header from "../components/Dashboard/Header";
import InProgress from "../components/Dashboard/InProgress";
import YetToStart from "../components/Dashboard/YetToStart";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("none");
  const [editTaskDiv, setEditTaskDiv] = useState("none");
  const [editTaskId, setEditTaskId] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // Kiểm tra sessionStorage khi component mount
  useEffect(() => {
    const checkEditTask = () => {
      const storedTaskId = sessionStorage.getItem("editTaskId");
      if (storedTaskId) {
        setEditTaskId(storedTaskId);
        setEditTaskDiv("flex");
      }
    };

    checkEditTask();
  }, []);

  const handleTaskAdded = () => {
    // Tăng key để trigger re-render và fetch lại dữ liệu
    setRefreshKey((prev) => prev + 1);
  };

  const handleEditTask = (task) => {
    // Lưu ID vào sessionStorage
    sessionStorage.setItem("editTaskId", task._id);
    setEditTaskId(task._id);
    setEditTaskDiv("flex");
  };

  const handleTaskUpdated = () => {
    // Tăng key để trigger re-render và fetch lại dữ liệu
    setRefreshKey((prev) => prev + 1);
  };

  const handleTaskDeleted = () => {
    // Tăng key để trigger re-render và fetch lại dữ liệu
    setRefreshKey((prev) => prev + 1);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:1000/api/v1/tasks/delete-task/${taskId}`,
        { withCredentials: true },
      );

      if (response.data.success) {
        alert("Task đã được xóa!");
        handleTaskDeleted();
      } else {
        alert(`Lỗi: ${response.data.message}`);
      }
    } catch (error) {
      console.error("Lỗi khi xóa task:", error);
      alert("Có lỗi xảy ra khi xóa task. Vui lòng thử lại.");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Đầu trang */}
      <Header setAddTaskDiv={setAddTaskDiv} />

      {/* Nội dung chính */}
      <main className="px-6 pt-20 pb-8">
        <h2 className="font-semibold text-gray-800 text-xl">Bảng điều khiển</h2>
        <p className="mt-2 text-gray-600">Chào mừng đến với Taskify!</p>

        {/* Bảng Kanban - 3 cột */}
        <div className="flex lg:flex-row flex-col gap-6 mt-6 min-h-[calc(100vh-200px)] max-h-[calc(100vh-180px)]">
          {/* Cột 1: Chưa bắt đầu */}
          <div className="flex-1 bg-gray-100 p-4 rounded-xl min-h-[300px] max-h-[600px] overflow-y-auto">
            <YetToStart
              key={`yet-to-start-${refreshKey}`}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </div>

          {/* Cột 2: Đang thực hiện */}
          <div className="flex-1 bg-blue-50 p-4 rounded-xl min-h-[300px] max-h-[600px] overflow-y-auto">
            <InProgress
              key={`in-progress-${refreshKey}`}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </div>

          {/* Cột 3: Hoàn thành */}
          <div className="flex-1 bg-green-50 p-4 rounded-xl min-h-[300px] max-h-[600px] overflow-y-auto">
            <Completed
              key={`completed-${refreshKey}`}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />
          </div>
        </div>
      </main>

      {/* Modal thêm task */}
      <div style={{ display: addTaskDiv }}>
        <AddTask onTaskAdded={handleTaskAdded} setAddTaskDiv={setAddTaskDiv} />
      </div>

      {/* Modal chỉnh sửa task */}
      <div style={{ display: editTaskDiv }}>
        <EditTask
          key={editTaskId || "edit-modal"}
          onTaskDeleted={handleTaskDeleted}
          onTaskUpdated={handleTaskUpdated}
          setEditTaskDiv={setEditTaskDiv}
          taskId={editTaskId}
        />
      </div>
    </div>
  );
};

export default Dashboard;
