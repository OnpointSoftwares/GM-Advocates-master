import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Navbar from "../components/Navbar"; // Import the Navbar component
import Footer from "../components/Footer/Footer";
import Articles from "../components/Articles";
import TeamMembers from "../components/TeamMembers";
import SystemUsers from "../components/SystemUsers";
import Reports from "../components/Reports";
import PracticeAreas from "../components/ManagePracticeAreas";

const Dashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");
  const [stats, setStats] = useState({
    articles: 10,
    teamMembers: 5,
    practiceAreas: 7,
    messages: 2,
  });

  // Authentication Check
  useEffect(() => {
    document.title = "Admin Dashboard";
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate]);

  // Generate Greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning! ☀️");
    else if (hour < 18) setGreeting("Good afternoon! 🌞");
    else setGreeting("Good evening! 🌙");
  }, []);

  // Render Content Based on Path
  const renderSection = () => {
    switch (location.pathname) {
      case "/dashboard/team-members": return <TeamMembers />;
      case "/dashboard/practice-areas": return <PracticeAreas />;
      case "/dashboard/system-users": return <SystemUsers />;
      case "/dashboard/reports": return <Reports />;
      default: return <Articles />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navbar */}
      <AdminNavbar />

      {/* Main Content */}
      <main className="container mx-auto p-8">
        {/* Greeting */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">
            Welcome, <span className="text-blue-600">{user?.username || "Admin"}</span>!
          </h2>
          <p className="text-gray-500">{greeting}</p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { name: "Articles", value: stats.articles, color: "bg-blue-500" },
            { name: "Team Members", value: stats.teamMembers, color: "bg-green-500" },
            { name: "Practice Areas", value: stats.practiceAreas, color: "bg-purple-500" },
            { name: "Messages", value: stats.messages, color: "bg-yellow-500" },
          ].map(({ name, value, color }) => (
            <div key={name} className={`p-6 rounded-lg shadow-md text-white ${color}`}>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-medium">{name}</p>
                  <p className="text-3xl font-bold">{value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        <div className="bg-white rounded-lg p-6 shadow-lg">{renderSection()}</div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
