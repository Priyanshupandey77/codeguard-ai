import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import History from "./pages/History";

function App() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </div>
  );
}

export default App;
