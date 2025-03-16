import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Reports.css";

const Reports = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/reports");
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
    <div className="reports-section">
      <h2>📊 System Reports</h2>

      {error ? (
        <p className="error">{error}</p>
      ) : loading ? (
        <p>Loading system stats...</p>
      ) : (
        <div className="stats-container">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="stat-card">
              {getIcon(key)} {formatKey(key)}: {value}
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
    appointments: "🎓",
    team_members: "👥",
  };
  return icons[key] || "📊";
};

export default Reports;
