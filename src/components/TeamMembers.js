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
      const response = await axios.get(`${BASE_URL}/api/team-members`);
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

      const response = await axios.post(`${BASE_URL}/api/team-members`, formData, {
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

      const response = await axios.put(`${BASE_URL}/api/team-members/${editingMember.id}`, formData, {
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
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">👥 Manage Team Members</h2>

      {error && <p className="text-red-600 text-center">{error}</p>}

      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded-md w-full max-w-md shadow-sm"
        />
      </div>

      <button
        onClick={() => setShowAddMemberForm(!showAddMemberForm)}
        className="block mx-auto bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
      >
        {showAddMemberForm ? "✖ Hide Form" : "➕ Add New Member"}
      </button>

      {showAddMemberForm && (
        <form className="bg-white shadow-md p-4 mt-4 rounded-md max-w-lg mx-auto" onSubmit={handleAddMember} encType="multipart/form-data">
          <input type="text" placeholder="Full Name" value={newMember.full_name} onChange={(e) => setNewMember({ ...newMember, full_name: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Position" value={newMember.position} onChange={(e) => setNewMember({ ...newMember, position: e.target.value })} required className="input-field" />
          <input type="email" placeholder="Email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} required className="input-field" />
          <input type="text" placeholder="Phone" value={newMember.phone} onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} className="input-field" />
          <input type="text" placeholder="Bio" value={newMember.bio} onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })} className="input-field" />
          <input type="file" accept="image/*" onChange={handleFileChange} className="block w-full my-2" />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">✔ Add Member</button>
        </form>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading team members...</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <li key={member.id} className="bg-white p-4 rounded-lg shadow-md flex flex-col items-center">
                <img
                  src={member.profile_picture ? `${BASE_URL}${member.profile_picture}` : "https://via.placeholder.com/100"}
                  alt={member.full_name}
                  className="w-24 h-24 rounded-full mb-3"
                />
                <h3 className="text-lg font-bold">{member.full_name}</h3>
                <p className="text-gray-600"><strong>Position:</strong> {member.position}</p>
                <p className="text-gray-600"><strong>Email:</strong> {member.email}</p>
                <p className="text-gray-600"><strong>Phone:</strong> {member.phone || "N/A"}</p>
                <div className="flex mt-4 space-x-2">
                  <button onClick={() => handleEditMember(member)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">✏ Edit</button>
                  <button onClick={() => handleDeleteMember(member.id)} className="bg-red-500 text-white px-3 py-1 rounded-md">❌ Remove</button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">No team members found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TeamMembers;
