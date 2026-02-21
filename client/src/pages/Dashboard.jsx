import { useState } from "react";
import AddTask from "../components/Dashboard/AddTask";
import Header from "../components/Dashboard/Header";

const Dashboard = () => {
  const [addTaskDiv, setAddTaskDiv] = useState("none");

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header setAddTaskDiv={setAddTaskDiv} />

      {/* Main Content */}
      <main className="px-6 pt-20">
        <h2 className="font-semibold text-gray-800 text-xl">Dashboard</h2>
        <p className="mt-2 text-gray-600">Chào mừng đến với Taskify!</p>
      </main>

      {/* Add Task Modal */}
      <div style={{ display: addTaskDiv }}>
        <AddTask setAddTaskDiv={setAddTaskDiv} />
      </div>
    </div>
  );
};

export default Dashboard;
