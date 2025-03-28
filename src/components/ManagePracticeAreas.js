import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Loader2, Image as ImageIcon, Edit2, Trash2, X, AlertCircle } from "lucide-react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const validateForm = (formData) => {
  const errors = {};
  
  if (!formData.title.trim()) {
    errors.title = 'Title is required';
  }
  
  if (!formData.description.trim()) {
    errors.description = 'Description is required';
  }
  
  if (formData.image) {
    if (!ALLOWED_FILE_TYPES.includes(formData.image.type)) {
      errors.image = 'Only JPG, PNG and WebP images are allowed';
    } else if (formData.image.size > MAX_FILE_SIZE) {
      errors.image = 'Image size must be less than 5MB';
    }
  }
  
  return errors;
};

const ManagePracticeAreas = () => {
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    areas_of_focus: "",
    image: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    setFormErrors(prev => ({ ...prev, [name]: '' }));

    if (name === "image") {
      const file = files[0];
      if (file) {
        // Validate file type and size
        if (!ALLOWED_FILE_TYPES.includes(file.type)) {
          setFormErrors(prev => ({ ...prev, image: 'Only JPG, PNG and WebP images are allowed' }));
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          setFormErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
          return;
        }

        setFormData(prev => ({ ...prev, image: file }));
        
        // Create image preview
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setFormData(prev => ({ ...prev, image: null }));
        setImagePreview(null);
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  }, []);

  const resetForm = () => {
    setFormData({ title: "", description: "", areas_of_focus: "", image: null });
    setImagePreview(null);
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm(formData);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    
    setIsSubmitting(true);
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
      resetForm();
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
    setImagePreview(area.image ? `https://home.gmorinaadvocates.org/uploads/${area.image}` : null);
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
          className={`mb-4 p-4 rounded-lg ${
            notification.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          } flex items-center justify-between`}
          role="alert"
        >
          <p className="font-medium">{notification.message}</p>
          <button
            onClick={() => setNotification({ message: '', type: '' })}
            className="text-xl hover:opacity-75 transition-opacity"
            aria-label="Close notification"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg flex items-center justify-between" role="alert">
          <p className="font-medium">{error}</p>
          <button
            onClick={() => setError(null)}
            className="text-xl hover:opacity-75 transition-opacity"
            aria-label="Close error message"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">
            {editingId ? "Edit Practice Area" : "Add New Practice Area"}
          </h2>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                id="title"
                type="text"
                name="title"
                placeholder="Enter title"
                value={formData.title}
                onChange={handleChange}
                required
                disabled={isSubmitting}
                aria-invalid={formErrors.title ? 'true' : 'false'}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent ${formErrors.title ? 'border-red-500' : 'border-gray-300'}`}
              />
              {formErrors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {formErrors.title}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="areas_of_focus" className="block text-sm font-medium text-gray-700">
                Areas of Focus
              </label>
              <input
                id="areas_of_focus"
                type="text"
                name="areas_of_focus"
                placeholder="Enter areas of focus (comma separated)"
                value={formData.areas_of_focus}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <div className="flex items-center space-x-4">
              <label className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <ImageIcon className="w-5 h-5 mr-2" />
                Choose Image
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
              {editingId ? "Update" : "Add"} Practice Area
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center px-6 py-3 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Table */}
      <div className="mt-8 bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-semibold text-gray-800">Practice Areas</h3>
        </div>
        
        {isLoading && !practiceAreas.length ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Areas of Focus</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {practiceAreas.map((area) => (
                  <tr key={area.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {area.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {area.description}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {area.areas_of_focus}
                    </td>
                    <td className="px-6 py-4">
                      {area.image && (
                        <img
                          src={`https://home.gmorinaadvocates.org/uploads/${area.image}`}
                          alt={area.title}
                          className="h-12 w-12 object-cover rounded-md"
                        />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleEdit(area)}
                          className="text-blue-600 hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(area.id)}
                          className="text-red-600 hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {practiceAreas.length === 0 && !isLoading && (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      No practice areas found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManagePracticeAreas;
