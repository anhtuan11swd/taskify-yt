import { Navigate, Route, Routes } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <Routes>
      <Route element={<Navigate replace to="/register" />} path="/" />
      <Route element={<Register />} path="/register" />
    </Routes>
  );
}

export default App;
