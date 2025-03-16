import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaTrashAlt, FaSearch } from "react-icons/fa"; // Import icons
import "./ManageAppointments.css";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/appointments`);
        setAppointments(response.data);
      } catch (err) {
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`${API_URL}/api/appointments/${id}`, { status });
      setAppointments(appointments.map(appt =>
        appt.id === id ? { ...appt, status } : appt
      ));
    } catch (err) {
      setError("Failed to update status.");
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      await axios.delete(`${API_URL}/api/appointments/${id}`);
      setAppointments(appointments.filter(appt => appt.id !== id));
    } catch (err) {
      setError("Failed to delete appointment.");
    }
  };

  // Filter appointments based on search and status
  const filteredAppointments = appointments.filter(appt =>
    (filterStatus === "All" || appt.status === filterStatus) &&
    appt.client_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="appointments-container">
      <h2>Manage Appointments</h2>

      {/* Search & Filter Section */}
      <div className="search-filter">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by client name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {error && <p className="error">{error}</p>}
      {loading ? <p>Loading...</p> : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appt => (
              <tr key={appt.id}>
                <td>{appt.client_name}</td>
                <td>{appt.date}</td>
                <td>{appt.time}</td>
                <td className={`status ${appt.status.toLowerCase()}`}>{appt.status}</td>
                <td>
                  <button onClick={() => updateStatus(appt.id, "Approved")} className="approve-btn">
                    <FaCheckCircle />
                  </button>
                  <button onClick={() => updateStatus(appt.id, "Rejected")} className="reject-btn">
                    <FaTimesCircle />
                  </button>
                  <button onClick={() => deleteAppointment(appt.id)} className="delete-btn">
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageAppointments;
