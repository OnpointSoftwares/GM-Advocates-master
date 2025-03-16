import React from "react";
import "./AdminNavbar.css";

const Navbar = () => {
  return (
    <div className="admin-navbar">
      <h2>Admin Dashboard</h2>
      <div className="admin-navbar-controls">
        <button>🔔 Notifications</button>
        <button>⚙️ Settings</button>
        <button>👤 Profile</button>
      </div>
    </div>
  );
};

export default Navbar;
