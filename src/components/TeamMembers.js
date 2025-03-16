import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TeamMembers.css";

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
    <div className="team-section">
      <h2>👥 Manage Team Members</h2>

      {error && <p className="error">{error}</p>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search team members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button onClick={() => setShowAddMemberForm(!showAddMemberForm)}>
        {showAddMemberForm ? "✖ Hide Form" : "➕ Add New Member"}
      </button>

      {showAddMemberForm && (
        <form className="add-member-form" onSubmit={handleAddMember} encType="multipart/form-data">
          <input type="text" placeholder="Full Name" value={newMember.full_name} onChange={(e) => setNewMember({ ...newMember, full_name: e.target.value })} required />
          <input type="text" placeholder="Position" value={newMember.position} onChange={(e) => setNewMember({ ...newMember, position: e.target.value })} required />
          <input type="email" placeholder="Email" value={newMember.email} onChange={(e) => setNewMember({ ...newMember, email: e.target.value })} required />
          <input type="text" placeholder="Phone" value={newMember.phone} onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })} />
          <input type="text" placeholder="Bio" value={newMember.bio} onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })} />
          <input type="file" accept="image/*" onChange={handleFileChange} />
          <button type="submit">✔ Add Member</button>
        </form>
      )}

      {editingMember && (
        <form className="edit-member-form" onSubmit={handleUpdateMember} encType="multipart/form-data">
          <h3>Edit Member</h3>
          <input type="text" value={editingMember.full_name} onChange={(e) => setEditingMember({ ...editingMember, full_name: e.target.value })} required />
          <input type="text" value={editingMember.position} onChange={(e) => setEditingMember({ ...editingMember, position: e.target.value })} required />
          <input type="email" value={editingMember.email} onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })} required />
          <input type="text" value={editingMember.phone} onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })} />
          <input type="text" value={editingMember.bio} onChange={(e) => setEditingMember({ ...editingMember, bio: e.target.value })} />
          <input type="file" accept="image/*" onChange={(e) => setEditingMember({ ...editingMember, profile_picture: e.target.files[0] })} />
          <button type="submit">✔ Save Changes</button>
          <button type="button" onClick={() => setEditingMember(null)}>❌ Cancel</button>
        </form>
      )}

      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <ul className="team-list">
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <li key={member.id} className="team-card">
                <img
                  src={member.profile_picture ? `${BASE_URL}${member.profile_picture}` : "https://via.placeholder.com/100"}
                  alt={member.full_name}
                  className="profile-pic"
                />
                <h3>{member.full_name}</h3>
                <p><strong>Position:</strong> {member.position}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Phone:</strong> {member.phone || "N/A"}</p>
                <button onClick={() => handleEditMember(member)}>✏ Edit</button>
                <button onClick={() => handleDeleteMember(member.id)}>❌ Remove</button>
              </li>
            ))
          ) : (
            <p>No team members found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default TeamMembers;
