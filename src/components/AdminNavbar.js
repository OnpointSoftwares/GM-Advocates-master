import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove JWT token
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="bg-blue-900 text-white flex justify-between items-center px-6 py-3 shadow-md">
      {/* Navbar Title */}
      <h2 className="text-lg font-semibold">Admin Panel</h2>

      {/* Navbar Controls */}
      <div className="flex space-x-4">
        <button className="bg-blue-700 px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
          👤 Profile
        </button>
        <button
          className="bg-red-600 px-4 py-2 rounded-md hover:bg-red-500 transition duration-200"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavbar;
