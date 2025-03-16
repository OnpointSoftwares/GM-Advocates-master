import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SystemUsers.css";

const SystemUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "subscriber",
  });

  const [editingUser, setEditingUser] = useState(null); // Store the user being edited
  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch system users from API
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/system-users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to load system users. Please try again.");
      setLoading(false);
    }
  };

  // Handle filtering users based on search term
  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  // Handle adding a new user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/system-users", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({ username: "", email: "", password: "", role: "subscriber" });
    } catch (error) {
      console.error("Error adding user:", error.response?.data || error.message);
      setError(error.response?.data?.error || "Failed to add user. Please try again.");
    }
  };

  // Handle deleting a user
  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/system-users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id && user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user. Please try again.");
    }
  };

  // Handle setting up user for editing
  const handleEditUser = (user) => {
    setEditingUser(user);
    setEditedUser({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  };

  // Handle updating user details
  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/system-users/${editingUser.id || editingUser._id}`, editedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUser.id || user._id === editingUser._id ? response.data : user
        )
      );

      setEditingUser(null);
      setEditedUser({ username: "", email: "", role: "" });
    } catch (error) {
      console.error("Error updating user:", error);
      setError("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="system-users">
      <h2>🔑 Manage System Users</h2>

      {/* Display Error Message */}
      {error && <p className="error">{error}</p>}

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Add User Form */}
      <form className="add-user-form" onSubmit={handleAddUser}>
        <input
          type="text"
          placeholder="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email Address"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <select
          value={newUser.role}
          onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
        >
          <option value="admin">Admin</option>
          <option value="editor">Editor</option>
          <option value="author">Author</option>
          <option value="subscriber">Subscriber</option>
        </select>
        <button type="submit">➕ Add User</button>
      </form>

      {/* Display Users List */}
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id || user._id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEditUser(user)}>
                      ✏️ Edit
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteUser(user.id || user._id)}>
                      ❌ Remove
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Edit User Modal */}
      {editingUser && (
        <div className="edit-user-modal">
          <h3>✏️ Edit User</h3>
          <form onSubmit={handleUpdateUser}>
            <input
              type="text"
              placeholder="Username"
              value={editedUser.username}
              onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={editedUser.email}
              onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
              required
            />
            <select
              value={editedUser.role}
              onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
            >
              <option value="admin">Admin</option>
              <option value="editor">Editor</option>
              <option value="author">Author</option>
              <option value="subscriber">Subscriber</option>
            </select>
            <button type="submit">✅ Update</button>
            <button type="button" onClick={() => setEditingUser(null)}>❌ Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SystemUsers;
