import React, { useState } from "react";

const Sidebar = ({ onNavigate = () => {}, activeSection }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className={`h-screen bg-blue-900 text-white transition-all duration-300 ${isOpen ? "w-64" : "w-16"} flex flex-col`}>
      {/* Toggle Button */}
      <button
        className="p-3 text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "❌" : "📂"}
      </button>

      {/* Sidebar Content */}
      {isOpen && (
        <div className="flex flex-col p-4">
          <h2 className="text-lg font-semibold mb-4 text-center">
            G.M ORINA & CO. ADVOCATES
          </h2>
          <ul className="space-y-3">
            <li
              className={`flex items-center p-2 hover:bg-blue-700 cursor-pointer rounded-md ${
                activeSection === "articles" ? "bg-blue-700" : ""
              }`}
              onClick={() => onNavigate("articles")}
            >
              📄 <span className="ml-2">Manage Articles</span>
            </li>
            <li
              className={`flex items-center p-2 hover:bg-blue-700 cursor-pointer rounded-md ${
                activeSection === "team-members" ? "bg-blue-700" : ""
              }`}
              onClick={() => onNavigate("team-members")}
            >
              👥 <span className="ml-2">Manage Team</span>
            </li>
            <li
              className={`flex items-center p-2 hover:bg-blue-700 cursor-pointer rounded-md ${
                activeSection === "practice-areas" ? "bg-blue-700" : ""
              }`}
              onClick={() => onNavigate("practice-areas")}
            >
              ⚖️ <span className="ml-2">Manage Practice Areas</span>
            </li>
            <li
              className={`flex items-center p-2 hover:bg-blue-700 cursor-pointer rounded-md ${
                activeSection === "system-users" ? "bg-blue-700" : ""
              }`}
              onClick={() => onNavigate("system-users")}
            >
              🔑 <span className="ml-2">System Users</span>
            </li>
            <li
              className={`flex items-center p-2 hover:bg-blue-700 cursor-pointer rounded-md ${
                activeSection === "reports" ? "bg-blue-700" : ""
              }`}
              onClick={() => onNavigate("reports")}
            >
              📊 <span className="ml-2">Reports</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
