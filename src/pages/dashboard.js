import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import Sidebar from "../components/Sidebar";
import AdminNavbar from "../components/AdminNavbar";
import Footer from "../components/Footer/Footer";
import Articles from "../components/Articles";
import TeamMembers from "../components/TeamMembers";
import SystemUsers from "../components/SystemUsers";
import Reports from "../components/Reports";
import PracticeAreas from "../components/ManagePracticeAreas";

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(
    localStorage.getItem("selectedSection") || "articles"
  );
  const [user, setUser] = useState(null);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    document.title = `Admin | ${selectedSection.replace("-", " ")}`;

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      setGreeting(generateGreeting());
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [navigate, selectedSection]);

  const handleSectionChange = (section) => {
    setSelectedSection(section);
    localStorage.setItem("selectedSection", section);
  };

  const generateGreeting = () => {
    const hour = new Date().getHours();
    const dayOfWeek = new Date().toLocaleString("en-US", { weekday: "long" });

    const greetings = {
      Monday: ["New week, new goals! 🚀", "Happy Monday! Let's win today! 💼"],
      Tuesday: ["Keep pushing! 🔥", "Success is built step by step! 💼"],
      Wednesday: ["Midweek hustle! 💪", "You're halfway there! 🚀"],
      Thursday: ["Almost the weekend! Keep going! 🔥", "Stay focused! 💼"],
      Friday: ["Happy Friday! 🎉", "End the week with a bang! 🚀"],
      Saturday: ["Weekend mode? Not yet! 💪", "Big rewards come from effort! 🔥"],
      Sunday: ["Recharge & reflect! 🌟", "Plan great things for next week! 🚀"],
    };

    const timeBasedGreetings = {
      morning: ["Good morning! ☀️", "Rise & shine! 🌅"],
      afternoon: ["Good afternoon! 🌞", "Keep driving success! 🚀"],
      evening: ["Good evening! 🌙", "Great job today! 🎯"],
    };

    const timeOfDay = hour < 12 ? "morning" : hour < 18 ? "afternoon" : "evening";

    const randomDayGreeting =
      greetings[dayOfWeek][Math.floor(Math.random() * greetings[dayOfWeek].length)];
    const randomTimeGreeting =
      timeBasedGreetings[timeOfDay][Math.floor(Math.random() * timeBasedGreetings[timeOfDay].length)];

    return `${randomDayGreeting} ${randomTimeGreeting}`;
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "articles":
        return <Articles />;
      case "team-members":
        return <TeamMembers />;
      case "practice-areas":
        return <PracticeAreas />;
      case "system-users":
        return <SystemUsers />;
      case "reports":
        return <Reports />;
      default:
        return <Articles />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        onNavigate={handleSectionChange}
        activeSection={selectedSection}
        className="w-full lg:w-1/4 xl:w-1/5"
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-2 sm:p-4 pt-16"> {/* Added pt-16 to fix content overlapping */}
        {/* Admin Navbar */}
        <AdminNavbar />

        {/* User Greeting */}
        {user && (
          <div className="p-4 bg-white shadow-md rounded-md m-2 sm:m-4 text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-bold text-gray-800">
              <span className="text-blue-600">{user.username || "Admin"}!</span> {greeting} 👋
            </h2>
          </div>
        )}
        

        {/* Dashboard Section */}
        <div className="flex-grow p-2 sm:p-4 bg-white rounded-md shadow-md overflow-auto">
          {renderSection()}
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
