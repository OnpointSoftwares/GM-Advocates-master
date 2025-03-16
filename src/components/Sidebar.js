import React from "react";
import "./Sidebar.css";

const Sidebar = ({ onNavigate = () => {} }) => {
  return (
    <div className="sidebar">
      <h2>G.M ORINA & CO. ADVOCATES</h2>
      <ul>
        <li onClick={() => onNavigate("articles")}>📄 Manage Articles</li>
        <li onClick={() => onNavigate("appointments")}>🎓 Manage Appointments</li>
        <li onClick={() => onNavigate("team-members")}>👥 Manage Team</li>
        <li onClick={() => onNavigate("system-users")}>🔑 System Users</li>
        <li onClick={() => onNavigate("reports")}>📊 Reports</li>
      </ul>
    </div>
  );
};

export default Sidebar;
