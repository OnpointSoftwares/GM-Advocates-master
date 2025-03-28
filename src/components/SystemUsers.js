import React, { useState, useEffect } from "react";
import axios from "axios";

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

  const [showPassword, setShowPassword] = useState(false);

  const [editingUser, setEditingUser] = useState(null);
  const [editedUser, setEditedUser] = useState({
    username: "",
    email: "",
    role: "",
    password: "", // Added password property
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("https://home.gmorinaadvocates.org/api/system-users");
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load system users. Please try again.");
      setLoading(false);
    }
  };

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : users;

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://home.gmorinaadvocates.org/api/system-users", newUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUsers((prevUsers) => [...prevUsers, response.data]);
      setNewUser({ username: "", email: "", password: "", role: "subscriber" });
    } catch (error) {
      setError("Failed to add user. Please try again.");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      await axios.delete(`https://home.gmorinaadvocates.org/api/system-users/${id}`);
      setUsers((prevUsers) => prevUsers.filter((user) => (user.id || user._id) !== id));
    } catch (error) {
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleEditUser = (user) => {
      setEditingUser(user);
      setEditedUser({
        username: user.username,
        email: user.email,
        role: user.role || "subscriber",
        password: "", // Initialize password as an empty string
      });
    };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await axios.put(`https://home.gmorinaadvocates.org/api/system-users/${editingUser.id || editingUser._id}`, editedUser, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          (user.id === editingUser.id || user._id === editingUser._id)
            ? response.data
            : user
        )
      );

      setEditingUser(null);
      setEditedUser({ username: "", email: "", role: "", password: "" });
    } catch (error) {
      setError("Failed to update user. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">🔑 Manage System Users</h2>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

{/* Add User Form */}
<form className="mb-6 space-y-4" onSubmit={handleAddUser}>
  <input
    type="text"
    placeholder="Username"
    className="w-full px-4 py-2 border rounded-md text-gray-900"
    value={newUser.username}
    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
    required
  />
  <input
    type="email"
    placeholder="Email Address"
    className="w-full px-4 py-2 border rounded-md text-gray-900"
    value={newUser.email}
    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
    required
  />
  <input
    type="password"
    placeholder="Password"
    className="w-full px-4 py-2 border rounded-md text-gray-900"
    value={newUser.password}
    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
    required
  />
  <select
    className="w-full px-4 py-2 border rounded-md text-gray-900"
    value={newUser.role}
    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
  >
    <option value="admin">Admin</option>
    <option value="editor">Editor</option>
    <option value="author">Author</option>
    <option value="subscriber">Subscriber</option>
  </select>
  <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md">
    ➕ Add User
  </button>
</form>

{/* Users Table */}
{loading ? (
  <p className="text-center text-gray-900">Loading users...</p>
) : (
  <table className="w-full border-collapse border">
    <thead>
      <tr className="bg-gray-200 text-gray-900">
        <th className="p-2">Username</th>
        <th className="p-2">Email</th>
        <th className="p-2">Password (Hidden)</th>
        <th className="p-2">Role</th>
        <th className="p-2">Actions</th>
      </tr>
    </thead>
    <tbody>
      {filteredUsers.length > 0 ? (
        filteredUsers.map((user) => (
          <tr key={user.id || user._id} className="border-t">
            <td className="p-2 text-gray-900">{user.username}</td>
            <td className="p-2 text-gray-900">{user.email}</td>
            <td className="p-2 text-gray-900">•••••••</td>
            <td className="p-2 text-gray-900">{user.role}</td>
            <td className="p-2 flex gap-2">
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-md"
                onClick={() => handleEditUser(user)}
              >
                ✏️ Edit
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => handleDeleteUser(user.id || user._id)}
              >
                ❌ Remove
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="5" className="text-center p-4 text-gray-900">
            No users found
          </td>
        </tr>
      )}
    </tbody>
  </table>
)}


{/* Edit User Modal */}
{editingUser && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-900">✏️ Edit User</h3>
      <form onSubmit={handleUpdateUser} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          className="w-full px-4 py-2 border rounded-md text-gray-900"
          value={editedUser.username}
          onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 border rounded-md text-gray-900"
          value={editedUser.email}
          onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
          required
        />

        {/* Password Field with Show/Hide Toggle */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="New Password (optional)"
            className="w-full px-4 py-2 border rounded-md text-gray-900 pr-10"
            value={editedUser.password || ''}
            onChange={(e) => setEditedUser({ ...editedUser, password: e.target.value })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between gap-2">
          <button type="submit" className="w-1/2 bg-green-600 text-white py-2 rounded-md">
            ✅ Update
          </button>
          <button
            type="button"
            className="w-1/2 bg-gray-400 text-white py-2 rounded-md"
            onClick={() => setEditingUser(null)}
          >
            ❌ Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
)}



    </div>
  );
};

export default SystemUsers;
