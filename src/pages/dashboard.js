import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import Articles from "../components/Articles";
import ManageAppointments from "../components/ManageAppointments";
import TeamMembers from "../components/TeamMembers";
import SystemUsers from "../components/SystemUsers";
import Reports from "../components/Reports";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState("articles");
  const [user, setUser] = useState(null);

  // Check if the user is authenticated by requesting session info from the backend
  /*useEffect(() => {
    axios.defaults.withCredentials = true; // Ensure cookies are sent
    axios
      .get("http://localhost:5000/dashboard") // Your protected endpoint
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.error("Session invalid or expired:", error);
        navigate("/login");
      });
  }, [navigate]);

  // Show a loading indicator while verifying the session
  if (!user) {
    return <div>Loading...</div>;
  }
*/
  // Handle sidebar navigation
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
          {/* Dynamically load the selected section */}
          {selectedSection === "articles" && <Articles />}
          {selectedSection === "appointments" && <ManageAppointments />}
          {selectedSection === "team-members" && <TeamMembers />}
          {selectedSection === "system-users" && <SystemUsers />}
          {selectedSection === "reports" && <Reports />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
