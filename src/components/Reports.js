import React, { useState, useEffect } from "react";
import axios from "axios";

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("/api/reports");
        setStats(data);
      } catch {
        setError("Failed to load system statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="bg-[#dcdcdc] min-h-screen p-6">
      <h2 className="text-3xl font-bold text-[#000435] mb-4 text-center">
        📊 System Reports
      </h2>

      {error ? (
        <p className="text-red-600 text-center">{error}</p>
      ) : loading ? (
        <p className="text-center text-[#555]">Loading system stats...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {Object.entries(stats).map(([key, value]) => (
            <div
              key={key}
              className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center text-center"
            >
              <span className="text-4xl">{getIcon(key)}</span>
              <h3 className="text-lg font-semibold text-[#000435] mt-2">
                {formatKey(key)}
              </h3>
              <p className="text-2xl font-bold text-[#024677]">{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ✅ Helper function to format keys
const formatKey = (key) =>
  key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

// ✅ Helper function to assign icons
const getIcon = (key) => {
  const icons = {
    users: "👥",
    articles: "📄",
    appointments: "📅",
    team_members: "👥",
    messages: "💬",
    revenue: "💰",
    transactions: "💳",
  };
  return icons[key] || "📊";
};

export default Reports;
