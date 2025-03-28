import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Loader2, Search, Plus, X, Edit2, Trash2, Save, Image } from "lucide-react";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);
  const [newArticle, setNewArticle] = useState({
    title: "",
    author: "",
    date: "",
    image: null,
    description: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("https://home.gmorinaadvocates.org/api/articles");
      setArticles(response.data);
    } catch (error) {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    setNewArticle({ ...newArticle, [e.target.name]: e.target.value });
  };

  const handleEditInputChange = (e) => {
    setEditingArticle({ ...editingArticle, [e.target.name]: e.target.value });
  };

  const handleDescriptionChange = (content) => {
    setNewArticle({ ...newArticle, description: content });
  };

  const handleEditDescriptionChange = (content) => {
    setEditingArticle({ ...editingArticle, description: content });
  };

  // Handle Image Selection
  const handleImageChange = (e) => {
    setNewArticle({ ...newArticle, image: e.target.files[0] });
  };

  const handleEditImageChange = (e) => {
    setEditingArticle({ ...editingArticle, image: e.target.files[0] });
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("title", newArticle.title);
    formData.append("author", newArticle.author);
    formData.append("date", newArticle.date);
    formData.append("description", newArticle.description);
    if (newArticle.image) formData.append("image", newArticle.image);

    try {
      const response = await axios.post("https://home.gmorinaadvocates.org/api/articles", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setArticles([...articles, response.data]);
      setNewArticle({ title: "", author: "", date: "", image: null, description: "" });
      setShowAddArticleForm(false);
    } catch (error) {
      setError("Failed to add article");
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await axios.delete(`https://home.gmorinaadvocates.org/api/articles/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      setError("Failed to delete article");
    }
  };

  const handleEditArticle = (article) => {
    setEditingArticle({ ...article, image: null });
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("title", editingArticle.title);
    formData.append("author", editingArticle.author);
    formData.append("date", editingArticle.date);
    formData.append("description", editingArticle.description);
    if (editingArticle.image) formData.append("image", editingArticle.image);

    try {
      const response = await axios.put(
        `https://home.gmorinaadvocates.org/api/articles/${editingArticle.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setArticles((prev) =>
        prev.map((article) => (article.id === editingArticle.id ? response.data : article))
      );
      setEditingArticle(null);
    } catch (error) {
      setError("Failed to update article");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Manage Articles</h2>
        <button
          onClick={() => setShowAddArticleForm(!showAddArticleForm)}
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
            showAddArticleForm ? "bg-red-500 hover:bg-red-600" : "bg-blue-600 hover:bg-blue-700"
          } text-white`}
        >
          {showAddArticleForm ? (
            <>
              <X className="w-5 h-5" /> Cancel
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" /> New Article
            </>
          )}
        </button>
      </div>

      {/* Add/Edit Form */}
      {showAddArticleForm && (
        <form onSubmit={handleAddArticle} className="bg-white p-6 shadow-lg rounded-lg">
          <input type="text" name="title" placeholder="Title" value={newArticle.title} onChange={handleInputChange} required className="w-full p-3 border rounded-lg mb-3" />
          <input type="text" name="author" placeholder="Author" value={newArticle.author} onChange={handleInputChange} required className="w-full p-3 border rounded-lg mb-3" />
          <input type="date" name="date" value={newArticle.date} onChange={handleInputChange} required className="w-full p-3 border rounded-lg mb-3" />
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-3 border rounded-lg mb-3" />
          <ReactQuill value={newArticle.description} onChange={handleDescriptionChange} className="w-full p-3 border rounded-lg mb-3" />
          <div className="flex gap-3">
            <button type="button" onClick={() => setShowAddArticleForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save</button>
          </div>
        </form>
      )}

      {/* Articles List */}
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article.id} className="bg-white p-4 shadow-md rounded-md border border-gray-200">
              <h3 className="font-bold text-lg">{article.title}</h3>
              <p className="text-gray-600"><strong>Author:</strong> {article.author}</p>
              <button onClick={() => handleEditArticle(article)} className="bg-yellow-500 text-white px-3 py-1 rounded-md">Edit</button>
              <button onClick={() => handleDeleteArticle(article.id)} className="bg-red-600 text-white px-3 py-1 rounded-md ml-3">Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
