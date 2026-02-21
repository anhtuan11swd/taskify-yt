import { useState } from "react";
import AddTask from "../components/Dashboard/AddTask";
import Completed from "../components/Dashboard/Completed";
import Header from "../components/Dashboard/Header";
import InProgress from "../components/Dashboard/InProgress";
import YetToStart from "../components/Dashboard/YetToStart";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("none");

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
            <YetToStart />
          </div>

          {/* Cột 2: Đang thực hiện */}
          <div className="flex-1 bg-blue-50 p-4 rounded-xl min-h-[300px] max-h-[600px] overflow-y-auto">
            <InProgress />
          </div>

          {/* Cột 3: Hoàn thành */}
          <div className="flex-1 bg-green-50 p-4 rounded-xl min-h-[300px] max-h-[600px] overflow-y-auto">
            <Completed />
          </div>
        </div>
      </main>

      {/* Modal thêm task */}
      <div style={{ display: addTaskDiv }}>
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>
    </div>
  );
};

export default Dashboard;
