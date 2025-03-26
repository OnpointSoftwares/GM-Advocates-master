import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const BASE_URL = "http://localhost:5000";

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}http://localhost:5000/api/team-members`);
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load team members");
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setNewMember({ ...newMember, profile_picture: e.target.files[0] });
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("full_name", newMember.full_name);
      formData.append("position", newMember.position);
      formData.append("email", newMember.email);
      formData.append("phone", newMember.phone);
      formData.append("bio", newMember.bio);
      if (newMember.profile_picture) {
        formData.append("profile_picture", newMember.profile_picture);
      }

      const response = await axios.post(`${BASE_URL}http://localhost:5000/api/team-members`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTeamMembers([...teamMembers, response.data]);
      setNewMember({ full_name: "", position: "", email: "", phone: "", bio: "", profile_picture: null });
      setShowAddMemberForm(false);
    } catch (error) {
      setError("Failed to add member");
    }
  };

  const handleEditMember = (member) => {
    setEditingMember({ ...member });
  };

  const handleUpdateMember = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("full_name", editingMember.full_name);
      formData.append("position", editingMember.position);
      formData.append("email", editingMember.email);
      formData.append("phone", editingMember.phone);
      formData.append("bio", editingMember.bio);
      if (editingMember.profile_picture instanceof File) {
        formData.append("profile_picture", editingMember.profile_picture);
      } else {
        formData.append("profile_picture", editingMember.profile_picture || "");
      }

      const response = await axios.put(`${BASE_URL}http://localhost:5000/api/team-members/${editingMember.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setTeamMembers((prevMembers) =>
        prevMembers.map((member) => (member.id === editingMember.id ? response.data : member))
      );

      setEditingMember(null);
    } catch (error) {
      setError("Failed to update member");
    }
  };

  const handleDeleteMember = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/team-members/${id}`);
      setTeamMembers(teamMembers.filter((member) => member.id !== id));
    } catch (error) {
      setError("Failed to delete member");
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
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

      <button
        onClick={() => setShowAddMemberForm(!showAddMemberForm)}
        className="bg-blue-500 text-white px-4 py-2 rounded-md mb-4"
      >
        {showAddMemberForm ? "✖ Hide Form" : "➕ Add New Member"}
      </button>

      {showAddMemberForm && (
        <form className="space-y-3 p-4 bg-gray-100 rounded-md" onSubmit={handleAddMember} encType="multipart/form-data">
          <input
            type="text"
            placeholder="Full Name"
            value={newMember.full_name}
            onChange={(e) => setNewMember({ ...newMember, full_name: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Position"
            value={newMember.position}
            onChange={(e) => setNewMember({ ...newMember, position: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={newMember.email}
            onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
            required
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Phone"
            value={newMember.phone}
            onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input type="file" accept="image/*" onChange={handleFileChange} className="w-full p-2 border border-gray-300 rounded-md" />
          <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
            ✔ Add Member
          </button>
        </form>
      )}
{editingMember && (
  <form
    className="bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-lg mx-auto space-y-4"
    onSubmit={handleUpdateMember}
    encType="multipart/form-data"
  >
    <h3 className="text-xl font-bold text-center text-[#000435]">✏️ Edit Member</h3>

    <input
      type="text"
      value={editingMember.full_name}
      onChange={(e) => setEditingMember({ ...editingMember, full_name: e.target.value })}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Full Name"
    />

    <input
      type="text"
      value={editingMember.position}
      onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Position"
    />

    <input
      type="email"
      value={editingMember.email}
      onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
      required
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Email"
    />

    <input
      type="text"
      value={editingMember.phone}
      onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Phone (Optional)"
    />

    <input
      type="text"
      value={editingMember.bio}
      onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })}
      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Short Bio (Optional)"
    />

    <input
      type="file"
      accept="image/*"
      onChange={(e) => setEditingMember({ ...editingMember, profile_picture: e.target.files[0] })}
      className="w-full p-2 border border-gray-300 rounded-md"
    />

    <div className="flex justify-between space-x-4">
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition"
      >
        ✔ Save Changes
      </button>

      <button
        type="button"
        onClick={() => setEditingMember(null)}
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition"
      >
        ❌ Cancel
      </button>
    </div>
  </form>
)}

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
                
                <div className="flex justify-center gap-2 mt-2">
                  <button
                    onClick={() => handleEditMember(member)}
                    className="bg-yellow-500 text-white px-4 py-1 rounded-md"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMember(member.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded-md"
                  >
                    🗑 Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center">No team members found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TeamMembers;
