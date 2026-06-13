import { Link, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, History, LogOut, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useState } from "react";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    setSidebarOpen(false);
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Navbar */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <button onClick={() => setSidebarOpen(true)} className="md:hidden">
            <Menu size={24} />
          </button>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold">
            R
          </div>

          <h1 className="text-lg md:text-xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
            ReviewPilot
          </h1>
        </div>

        
      </header>

      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => setSidebarOpen(false)}
          />

          <aside
            className="
        relative
        w-64
        h-full
        bg-[#09090B]
        border-r
        border-zinc-800
        p-4
      "
          >
            <div className="flex justify-end mb-4">
              <button onClick={() => setSidebarOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <nav className="space-y-2">
              <Link
                to="/"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  location.pathname === "/"
                    ? "bg-zinc-800"
                    : "hover:bg-zinc-900"
                }`}
              >
                <LayoutDashboard size={18} />
                Dashboard
              </Link>

              <Link
                to="/history"
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 p-3 rounded-xl ${
                  location.pathname === "/history"
                    ? "bg-zinc-800"
                    : "hover:bg-zinc-900"
                }`}
              >
                <History size={18} />
                History
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 w-full text-left"
              >
                <LogOut size={18} />
                Logout
              </button>
            </nav>
          </aside>
        </div>
      )}
      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <aside
          className="
    hidden
    md:block
    w-64
    border-r
    border-zinc-800
    min-h-[calc(100vh-64px)]
    p-4
  "
        >
          <nav className="space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-3 p-3 rounded-xl ${
                location.pathname === "/" ? "bg-zinc-800" : "hover:bg-zinc-900"
              }`}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </Link>

            <Link
              to="/history"
              className={`flex items-center gap-3 p-3 rounded-xl ${
                location.pathname === "/history"
                  ? "bg-zinc-800"
                  : "hover:bg-zinc-900"
              }`}
            >
              <History size={18} />
              History
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 w-full text-left"
            >
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </aside>
        {/* Content */}
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
