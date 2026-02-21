import { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Chỉ redirect khi user ở root path hoặc path không hợp lệ
    if (location.pathname === "/") {
      const userLoggedIn = localStorage.getItem("userLoggedIn");
      if (userLoggedIn === "true") {
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    }
  }, [navigate, location.pathname]);

  return (
    <Routes>
      <Route element={<Navigate replace to="/login" />} path="/" />
      <Route element={<Register />} path="/register" />
      <Route element={<Login />} path="/login" />
      <Route element={<Dashboard />} path="/dashboard" />
    </Routes>
  );
}

export default App;
