import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader2 } from "lucide-react";

const ManagePracticeAreas = () => {
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    areas_of_focus: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    fetchPracticeAreas();
  }, []);

  const fetchPracticeAreas = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await axios.get("https://home.gmorinaadvocates.org/api/practice-areas");
      setPracticeAreas(response.data);
    } catch (err) {
      setError("Failed to fetch practice areas. Please try again.");
      console.error("Error fetching practice areas:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      setError(null);
      const form = new FormData();
      form.append("title", formData.title);
      form.append("description", formData.description);
      form.append("areas_of_focus", formData.areas_of_focus);
      if (formData.image) form.append("image", formData.image);

      if (editingId) {
        await axios.put(`https://home.gmorinaadvocates.org/api/practice-areas/${editingId}`, form);
        setNotification({ message: "Practice area updated successfully!", type: "success" });
      } else {
        await axios.post("https://home.gmorinaadvocates.org/api/practice-areas", form);
        setNotification({ message: "Practice area added successfully!", type: "success" });
      }

      fetchPracticeAreas();
      setFormData({ title: "", description: "", areas_of_focus: "", image: null });
      setEditingId(null);
    } catch (err) {
      setError("Failed to save practice area. Please try again.");
      console.error("Error saving practice area:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (area) => {
    setEditingId(area.id);
    setFormData({
      title: area.title,
      description: area.description,
      areas_of_focus: area.areas_of_focus,
      image: null,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this practice area?')) {
      try {
        setIsLoading(true);
        setError(null);
        await axios.delete(`https://home.gmorinaadvocates.org/api/practice-areas/${id}`);
        setNotification({ message: "Practice area deleted successfully!", type: "success" });
        fetchPracticeAreas();
      } catch (err) {
        setError("Failed to delete practice area. Please try again.");
        console.error("Error deleting practice area:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Notification */}
      {notification.message && (
        <div
          className={`mb-4 p-4 rounded-lg ${notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
          role="alert"
        >
          <p className="font-medium">{notification.message}</p>
          <button
            onClick={() => setNotification({ message: '', type: '' })}
            className="float-right -mt-6 text-xl"
          >
            ×
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg" role="alert">
          <p className="font-medium">{error}</p>
        </div>
      )}
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">
        Manage Practice Areas
      </h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded p-2 w-full"
          />
          <input
            type="text"
            name="areas_of_focus"
            placeholder="Areas of Focus (comma separated)"
            value={formData.areas_of_focus}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          />
        </div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
          className="border rounded p-2 w-full mt-4"
        ></textarea>
        <input
          type="file"
          name="image"
          onChange={handleChange}
          className="mt-4"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[150px]`}
        >
          {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          {editingId ? "Update" : "Add"} Practice Area
        </button>
      </form>

      {/* Table */}
      <div className="mt-8 overflow-x-auto rounded-lg shadow">
        {isLoading && !practiceAreas.length && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-50 text-left">
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Areas of Focus</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {practiceAreas.map((area) => (
              <tr key={area.id} className="border-b hover:bg-gray-50 transition-colors">
                <td className="border p-2">{area.title}</td>
                <td className="border p-2">{area.description}</td>
                <td className="border p-2">{area.areas_of_focus}</td>
                <td className="border p-2">
                  {area.image && (
                    <img
                      src={` https://home.gmorinaadvocates.org/uploads/${area.image}`}
                      alt={area.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="border p-2">
                  <div className="flex gap-2 justify-center">
                  <button
                    onClick={() => handleEdit(area)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(area.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    Delete
                  </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePracticeAreas;
