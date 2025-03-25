import React, { useState, useEffect } from "react";
import axios from "axios";

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editingArticle, setEditingArticle] = useState(null);
  const [showAddArticleForm, setShowAddArticleForm] = useState(false);
  const [expandedArticles, setExpandedArticles] = useState({});

  const [newArticle, setNewArticle] = useState({
    title: "",
    author: "",
    date: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("/api/articles");
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load articles");
      setLoading(false);
    }
  };

  const handleAddArticle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/articles", newArticle);
      setArticles([...articles, response.data]);
      setNewArticle({ title: "", author: "", date: "", image: "", description: "" });
      setShowAddArticleForm(false);
    } catch (error) {
      setError("Failed to add article");
    }
  };

  const handleDeleteArticle = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      await axios.delete(`/api/articles/${id}`);
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
    if (!window.confirm("Save changes to this article?")) return;

    try {
      const response = await axios.put(`/api/articles/${editingArticle.id}`, editingArticle);
      setArticles((prevArticles) =>
        prevArticles.map((article) => (article.id === editingArticle.id ? response.data : article))
      );
      setEditingArticle(null);
    } catch (error) {
      setError("Failed to update article");
    }
  };

  const toggleExpand = (id) => {
    setExpandedArticles((prev) => ({ ...prev, [id]: !prev[id] }));
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

      {/* Add Article Button */}
      <button
        onClick={() => setShowAddArticleForm(!showAddArticleForm)}
        className="bg-[#024677] text-white px-5 py-2 rounded-md shadow-md hover:bg-[#000435] transition"
      >
        {showAddArticleForm ? "✖ Hide Form" : "➕ Add New Article"}
      </button>

      {/* Add Article Form */}
      {showAddArticleForm && (
        <form className="mt-4 bg-white p-4 shadow-md rounded-md" onSubmit={handleAddArticle}>
          <input
            type="text"
            placeholder="Title"
            value={newArticle.title}
            onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
            required
            className="w-full p-2 border rounded-md mb-3"
          />
          <input
            type="text"
            placeholder="Author"
            value={newArticle.author}
            onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })}
            required
            className="w-full p-2 border rounded-md mb-3"
          />
          <input
            type="date"
            value={newArticle.date}
            onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })}
            required
            className="w-full p-2 border rounded-md mb-3"
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newArticle.image}
            onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })}
            className="w-full p-2 border rounded-md mb-3"
          />
          <textarea
            placeholder="Description"
            value={newArticle.description}
            onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })}
            required
            className="w-full p-2 border rounded-md mb-3"
          />
          <button type="submit" className="bg-green-600 text-white px-5 py-2 rounded-md shadow-md hover:bg-green-500 transition">
            ✔ Add Article
          </button>
        </form>
      )}

      {/* Articles List */}
      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id} className="bg-white shadow-md p-4 rounded-md">
                <img
                  src={article.image || "https://via.placeholder.com/150"}
                  alt={article.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h3 className="font-bold text-lg text-[#000435]">{article.title}</h3>
                <p className="text-gray-600"><strong>Author:</strong> {article.author}</p>
                <p className="text-gray-600"><strong>Date:</strong> {article.date}</p>
                <p className="text-gray-700">
                  {expandedArticles[article.id] ? article.description : `${article.description.slice(0, 100)}...`}
                </p>
                <button
                  onClick={() => toggleExpand(article.id)}
                  className="text-[#024677] mt-2 font-semibold"
                >
                  {expandedArticles[article.id] ? "View Less" : "Read More"}
                </button>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => handleEditArticle(article)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-400 transition"
                  >
                    ✏ Edit
                  </button>
                  <button
                    onClick={() => handleDeleteArticle(article.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-500 transition"
                  >
                    ❌ Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Articles;
