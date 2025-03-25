import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Menu, X } from "lucide-react"; // Icons for mobile menu

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser(decoded);
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-900 text-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo / Title */}
          <h2 className="text-lg font-semibold">Admin Panel</h2>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 ml-auto">
            {user && (
              <span className="text-sm bg-blue-700 px-3 py-1 rounded-lg">
                Welcome, {user.username || "Admin"}!
              </span>
            )}
            {/* <button className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
              👤 Profile
            </button> */}
            <button
              className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
              onClick={handleLogout}
            >
              🚪 Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 p-4 space-y-3 text-center">
          {user && <p className="text-sm">Welcome, {user.username || "Admin"}!</p>}
          {/* <button className="block w-full bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
            👤 Profile
          </button> */}
          <button
            className="block w-full bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
