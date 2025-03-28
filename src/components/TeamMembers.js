import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar"; // Import the Navbar component

const TeamMembers = () => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingMember, setEditingMember] = useState(null);
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);

  const [newMember, setNewMember] = useState({
    full_name: "",
    position: "",
    email: "",
    phone: "",
    bio: "",
    profile_picture: null,
  });

  const BASE_URL = "https://home.gmorinaadvocates.org";

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/team-members`);
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load team members");
      setLoading(false);
    }
  };

  return (
    <div>
      <AdminNavbar /> {/* Add Navbar component */}
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#000435]">
          👥 Manage Team Members
        </h2>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search team members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {loading ? (
          <p className="text-center">Loading team members...</p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {teamMembers.length > 0 ? (
              teamMembers.map((member) => (
                <li key={member.id} className="p-4 border rounded-md shadow-md">
                  <img
                    src={member.profile_picture ? `${BASE_URL}${member.profile_picture}` : "https://via.placeholder.com/100"}
                    alt={member.full_name}
                    className="w-24 h-24 rounded-full mx-auto"
                  />
                  <h3 className="text-lg font-semibold text-center mt-2 text-[#000435]">{member.full_name}</h3>
                  <p className="text-center text-[#000435]"><strong>Position:</strong> {member.position}</p>
                  <p className="text-center text-[#000435]"><strong>Email:</strong> {member.email}</p>
                  <p className="text-center text-[#000435]"><strong>Phone:</strong> {member.phone || "N/A"}</p>
                </li>
              ))
            ) : (
              <p className="text-center">No team members found.</p>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TeamMembers;
