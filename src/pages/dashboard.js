import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Activity, Users, BookOpen, MessageSquare, FileText, Settings } from "lucide-react";

//import AdminNavbar from "../components/AdminNavbar";
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

  const generateGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning! ☀️";
    if (hour < 18) return "Good afternoon! 🌞";
    return "Good evening! 🌙";
  };

  const renderSection = () => {
    switch (location.pathname) {
      case "/team-members": return <TeamMembers />;
      case "/practice-areas": return <PracticeAreas />;
      case "/system-users": return <SystemUsers />;
      case "/reports": return <Reports />;
      default: return <Articles />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
     

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg fixed h-full p-6 hidden lg:block">
          <nav className="space-y-4">
            {[
              { path: "/dashboard", name: "Articles", icon: FileText },
              { path: "/team-members", name: "Team Members", icon: Users },
              { path: "/practice-areas", name: "Practice Areas", icon: BookOpen },
              { path: "/system-users", name: "System Users", icon: Settings },
            ].map(({ path, name, icon: Icon }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center space-x-3 p-3 rounded-lg transition-all ${
                    isActive ? "bg-blue-500 text-white" : "hover:bg-gray-100"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </NavLink>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 lg:ml-64">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">
              Welcome, <span className="text-blue-600">{user?.username || "Admin"}</span>!
            </h2>
            <p className="text-gray-500">{greeting}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Articles", value: stats.articles, color: "bg-blue-500", icon: FileText },
              { name: "Team Members", value: stats.teamMembers, color: "bg-green-500", icon: Users },
              { name: "Practice Areas", value: stats.practiceAreas, color: "bg-purple-500", icon: BookOpen },
              { name: "Messages", value: stats.messages, color: "bg-yellow-500", icon: MessageSquare },
            ].map(({ name, value, color, icon: Icon }) => (
              <div key={name} className={`p-6 rounded-lg shadow-md text-white ${color}`}>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-lg font-medium">{name}</p>
                    <p className="text-3xl font-bold">{value}</p>
                  </div>
                  <Icon className="w-10 h-10 opacity-75" />
                </div>
              </div>
            ))}
          </div>

          {/* Content Section */}
          <div className="bg-white rounded-lg p-6 shadow-lg">{renderSection()}</div>
        </main>
      </div>
  
    </div>
  );
};

export default Dashboard;