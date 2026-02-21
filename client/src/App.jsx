import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/login" />} path="/" />
      <Route element={<Register />} path="/register" />
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}

export default App;
