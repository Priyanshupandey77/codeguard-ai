import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, History, LogOut } from "lucide-react";

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#09090B] text-white">
      {/* Navbar */}
      <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold">
            ⚡
          </div>

          <h1 className="text-xl font-bold">CodeGuard AI</h1>
        </div>

        <button className="text-zinc-400 hover:text-white">Logout</button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-zinc-800 min-h-[calc(100vh-64px)] p-4">
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

            <button className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-900 w-full text-left">
              <LogOut size={18} />
              Logout
            </button>
          </nav>
        </aside>
        {/* Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
