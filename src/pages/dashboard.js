import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import for redirection
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import Articles from "../components/Articles";
import ManageAppointments from "../components/ManageAppointments";
import TeamMembers from "../components/TeamMembers";
import SystemUsers from "../components/SystemUsers";
import Reports from "../components/Reports";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ Navigation hook
  const [selectedSection, setSelectedSection] = useState("articles"); // Default section

  // ✅ Check if the admin is logged in
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminToken"); // Assuming token is stored here
    if (!isAuthenticated) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  // Function to handle navigation changes
  const handleNavigation = (section) => {
    setSelectedSection(section);
  };

  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <Sidebar onNavigate={handleNavigation} />

      {/* Main Content */}
      <div className="dashboard-content">
        <AdminNavbar />

        <div className="dashboard-section">
          {/* Dynamically Load Selected Section */}
          {selectedSection === "articles" && <Articles />}
          {selectedSection === "ManageAppointments" && <ManageAppointments />}
          {selectedSection === "team-members" && <TeamMembers />}
          {selectedSection === "system-users" && <SystemUsers />}
          {selectedSection === "reports" && <Reports />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
