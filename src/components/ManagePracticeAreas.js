import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagePracticeAreas = () => {
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    areas_of_focus: "",
    image: null,
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchPracticeAreas();
  }, []);

  const fetchPracticeAreas = async () => {
    const response = await axios.get("http://localhost:5000/api/practice-areas");
    setPracticeAreas(response.data);
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
    const form = new FormData();
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("areas_of_focus", formData.areas_of_focus);
    if (formData.image) form.append("image", formData.image);

    if (editingId) {
      await axios.put(`http://localhost:5000/api/practice-areas/${editingId}`, form);
    } else {
      await axios.post("http://localhost:5000/api/practice-areas", form);
    }

    fetchPracticeAreas();
    setFormData({ title: "", description: "", areas_of_focus: "", image: null });
    setEditingId(null);
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
    await axios.delete(`http://localhost:5000/api/practice-areas/${id}`);
    fetchPracticeAreas();
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
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
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {editingId ? "Update" : "Add"} Practice Area
        </button>
      </form>

      {/* Table */}
      <div className="mt-8">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Areas of Focus</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {practiceAreas.map((area) => (
              <tr key={area.id} className="border-b">
                <td className="border p-2">{area.title}</td>
                <td className="border p-2">{area.description}</td>
                <td className="border p-2">{area.areas_of_focus}</td>
                <td className="border p-2">
                  {area.image && (
                    <img
                      src={`http://localhost:5000/uploads/${area.image}`}
                      alt={area.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                </td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(area)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(area.id)}
                    className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
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
