import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactQuill from "react-quill"; // Import Quill.js
import "react-quill/dist/quill.snow.css"; // Quill styles

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

  // Quill Editor Configuration
  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "check",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get("http://localhost:5000/api/articles");
      setArticles(response.data);
    } catch (error) {
      setError("Failed to load articles");
    } finally {
      setLoading(false);
    }
  };

  // Handle Form Inputs
  const handleDescriptionChange = (content) => {
    setNewArticle({ ...newArticle, description: content });
  };

  const handleEditDescriptionChange = (content) => {
    setEditingArticle({ ...editingArticle, description: content });
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    Object.entries(newArticle).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.post("http://localhost:5000/api/articles", formData, {
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
      await axios.delete(`http://localhost:5000/api/articles/${id}`);
      setArticles(articles.filter((article) => article.id !== id));
    } catch (error) {
      setError("Failed to delete article");
    }
  };

  const handleEditArticle = (article) => {
    setEditingArticle({ ...article });
  };

  const handleUpdateArticle = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    Object.entries(editingArticle).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const response = await axios.put(
        `http://localhost:5000/api/articles/${editingArticle.id}`,
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
    <div className="p-6 bg-[#dcdcdc] min-h-screen">
      <h2 className="text-3xl font-semibold text-[#000435] mb-6">📰 Manage Articles</h2>

      {error && <p className="text-red-600">{error}</p>}

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded-md shadow-md"
        />
      </div>

      {/* Toggle Add Form */}
      <button
        onClick={() => setShowAddArticleForm(!showAddArticleForm)}
        className="bg-[#024677] text-white px-5 py-2 rounded-md shadow-md hover:bg-[#000435] transition"
      >
        {showAddArticleForm ? "✖ Hide Form" : "➕ Add New Article"}
      </button>
      {/* Add Article Form */}
      {showAddArticleForm && (
        <form className="mt-4 bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto" onSubmit={handleAddArticle}>
          <h3 className="text-2xl font-bold mb-5">Add New Article</h3>

          <div className="space-y-4">
            <input type="text" placeholder="Title" value={newArticle.title}
              onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} required className="w-full p-3 border rounded-lg" />

            <input type="text" placeholder="Author" value={newArticle.author}
              onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })} required className="w-full p-3 border rounded-lg" />

            <input type="date" value={newArticle.date}
              onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })} required className="w-full p-3 border rounded-lg" />

            <input type="file" accept="image/*"
              onChange={(e) => setNewArticle({ ...newArticle, image: e.target.files[0] })} className="w-full p-3 border rounded-lg" />

            <ReactQuill value={newArticle.description} onChange={handleDescriptionChange}
              modules={modules} formats={formats} className="w-full p-3 border rounded-lg" style={{ height: "200px" }} />
          </div>

          <button type="submit" className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg">✔ Add Article</button>
        </form>
      )}

      {/* Edit Article Form */}
      {editingArticle && (
        <form className="mt-4 bg-white p-6 shadow-md rounded-lg max-w-lg mx-auto" onSubmit={handleUpdateArticle}>
          <h3 className="text-2xl font-bold mb-5">✏ Edit Article</h3>

          <input type="text" placeholder="Title" value={editingArticle.title}
            onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} required className="w-full p-3 border rounded-lg" />

          <input type="text" placeholder="Author" value={editingArticle.author}
            onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })} required className="w-full p-3 border rounded-lg" />

          <input type="date" value={editingArticle.date}
            onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })} required className="w-full p-3 border rounded-lg" />

          <input type="file" accept="image/*"
            onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.files[0] })} className="w-full p-3 border rounded-lg" />

          <ReactQuill value={editingArticle.description} onChange={handleEditDescriptionChange}
            modules={modules} formats={formats} className="w-full p-3 border rounded-lg" style={{ height: "200px" }} />

          <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg">✔ Update Article</button>
        </form>
      )}

      {/* Articles List */}
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles
            .filter((article) => article.title.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((article) => (
              <div key={article.id} className="bg-white p-4 shadow-md rounded-md border border-gray-200">
                <h3 className="font-bold text-lg">{article.title}</h3>
                <p className="text-gray-600"><strong>Author:</strong> {article.author}</p>
                <button onClick={() => handleEditArticle(article)} className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400">✏ Edit</button>
                <button onClick={() => handleDeleteArticle(article.id)} className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 ml-3">❌ Delete</button>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Articles;
