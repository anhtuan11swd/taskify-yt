import { useState } from "react";
import AddTask from "../components/Dashboard/AddTask";
import Completed from "../components/Dashboard/Completed";
import EditTask from "../components/Dashboard/EditTask";
import Header from "../components/Dashboard/Header";
import InProgress from "../components/Dashboard/InProgress";
import YetToStart from "../components/Dashboard/YetToStart";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("none");
  const [editTaskDiv, setEditTaskDiv] = useState("none");
  const [selectedTask, setSelectedTask] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTaskAdded = () => {
    // Tăng key để trigger re-render và fetch lại dữ liệu
    setRefreshKey((prev) => prev + 1);
  };

  const handleEditTask = (task) => {
    setSelectedTask(task);
    setEditTaskDiv("flex");
  };

  const handleTaskUpdated = () => {
    // Tăng key để trigger re-render và fetch lại dữ liệu
    setRefreshKey((prev) => prev + 1);
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
              onEditTask={handleEditTask}
            />
          </div>

          {/* Cột 2: Đang thực hiện */}
          <div className="flex-1 bg-blue-50 p-4 rounded-xl min-h-[300px] max-h-[600px] overflow-y-auto">
            <InProgress
              key={`in-progress-${refreshKey}`}
              onEditTask={handleEditTask}
            />
          </div>

          {/* Cột 3: Hoàn thành */}
          <div className="flex-1 bg-green-50 p-4 rounded-xl min-h-[300px] max-h-[600px] overflow-y-auto">
            <Completed
              key={`completed-${refreshKey}`}
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
          key={selectedTask?._id || "edit-modal"}
          onTaskUpdated={handleTaskUpdated}
          setEditTaskDiv={setEditTaskDiv}
          task={selectedTask}
        />
      </div>
    </div>
  );
};

export default Dashboard;
