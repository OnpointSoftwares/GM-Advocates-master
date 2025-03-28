import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import {
  Menu,
  X,
  Home,
  Users,
  BookOpen,
  FileText,
  Settings,
  LogOut,
  Loader2,
} from "lucide-react";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkAuth = useCallback(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        throw new Error("Session expired");
      }
      setUser(decoded);
    } catch (err) {
      setError("Session expired. Redirecting...");
      localStorage.removeItem("token");
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => checkAuth(), [checkAuth]);

  return { user, loading, error };
};

const MenuItem = ({ path, label, icon, onClick }) => {
  const location = useLocation();
  return (
    <Link
      to={path}
      onClick={onClick}
      className={`flex items-center space-x-2 px-4 py-2 rounded-md transition ${
        location.pathname === path
          ? "bg-blue-700 text-white"
          : "text-blue-100 hover:bg-blue-700/50"
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const AdminSidebar = () => {
  const navigate = useNavigate();
  const { user, loading, error } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const menuItems = useMemo(
    () => [
      { path: "/dashboard", label: "Dashboard", icon: <Home className="w-5 h-5" /> },
      { path: "/dashboard/articles", label: "Articles", icon: <BookOpen className="w-5 h-5" /> },
      { path: "/dashboard/team-members", label: "Team Members", icon: <Users className="w-5 h-5" /> },
      { path: "/dashboard/system-users", label: "System Users", icon: <Settings className="w-5 h-5" /> },
      { path: "/dashboard/reports", label: "Reports", icon: <FileText className="w-5 h-5" /> },
    ],
    []
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-blue-900 to-blue-800 text-white shadow-lg z-50 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-64"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/dashboard" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <img src="/logo.png" alt="Logo" className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-semibold">GM Advocates</h2>
          </Link>
          {/* Close button for mobile */}
          <button
            className="lg:hidden text-white p-1 focus:outline-none"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="mt-4">
          {loading ? (
            <div className="flex items-center space-x-2 px-4 py-2">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Loading...</span>
            </div>
          ) : (
            menuItems.map((item) => <MenuItem key={item.path} {...item} onClick={() => setIsSidebarOpen(false)} />)
          )}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4">
          {user && (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 text-white p-2 bg-blue-800 rounded-md z-50"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Overlay for Mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content Wrapper */}
      <div className="lg:pl-64 pt-16">
        {/* Content goes here */}
      </div>
    </>
  );
};

export default AdminSidebar;
