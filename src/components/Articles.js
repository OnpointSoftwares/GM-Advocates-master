import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Articles.css";

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
    image: "",
    description: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/articles");
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
      const response = await axios.post("http://localhost:5000/api/articles", newArticle);
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
    if (!window.confirm("Save changes to this article?")) return;

    try {
      const response = await axios.put(`http://localhost:5000/api/articles/${editingArticle.id}`, editingArticle);

      setArticles((prevArticles) =>
        prevArticles.map((article) => (article.id === editingArticle.id ? response.data : article))
      );

      setEditingArticle(null);
    } catch (error) {
      setError("Failed to update article");
    }
  };

  return (
    <div className="articles-section">
      <h2>📰 Manage Articles</h2>

      {error && <p className="error">{error}</p>}

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <button onClick={() => setShowAddArticleForm(!showAddArticleForm)}>
        {showAddArticleForm ? "✖ Hide Form" : "➕ Add New Article"}
      </button>

      {showAddArticleForm && (
        <form className="add-article-form" onSubmit={handleAddArticle}>
          <input type="text" placeholder="Title" value={newArticle.title} onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })} required />
          <input type="text" placeholder="Author" value={newArticle.author} onChange={(e) => setNewArticle({ ...newArticle, author: e.target.value })} required />
          <input type="date" placeholder="Date" value={newArticle.date} onChange={(e) => setNewArticle({ ...newArticle, date: e.target.value })} required />
          <input type="text" placeholder="Image URL" value={newArticle.image} onChange={(e) => setNewArticle({ ...newArticle, image: e.target.value })} />
          <textarea placeholder="Description" value={newArticle.description} onChange={(e) => setNewArticle({ ...newArticle, description: e.target.value })} required />
          <button type="submit">✔ Add Article</button>
        </form>
      )}

      {editingArticle && (
        <form className="edit-article-form" onSubmit={handleUpdateArticle}>
          <h3>Edit Article</h3>
          <input type="text" value={editingArticle.title} onChange={(e) => setEditingArticle({ ...editingArticle, title: e.target.value })} required />
          <input type="text" value={editingArticle.author} onChange={(e) => setEditingArticle({ ...editingArticle, author: e.target.value })} required />
          <input type="date" value={editingArticle.date} onChange={(e) => setEditingArticle({ ...editingArticle, date: e.target.value })} required />
          <input type="text" value={editingArticle.image} onChange={(e) => setEditingArticle({ ...editingArticle, image: e.target.value })} />
          <textarea value={editingArticle.description} onChange={(e) => setEditingArticle({ ...editingArticle, description: e.target.value })} required />
          <button type="submit">✔ Save Changes</button>
          <button type="button" onClick={() => setEditingArticle(null)}>❌ Cancel</button>
        </form>
      )}

      {loading ? (
        <p>Loading articles...</p>
      ) : (
        <ul className="articles-list">
          {articles.length > 0 ? (
            articles.map((article) => (
              <li key={article.id} className="article-card">
                <img src={article.image || "https://via.placeholder.com/150"} alt={article.title} className="article-image" />
                <h3>{article.title}</h3>
                <p><strong>Author:</strong> {article.author}</p>
                <p><strong>Date:</strong> {article.date}</p>
                <p>{article.description.slice(0, 100)}...</p>
                <button onClick={() => handleEditArticle(article)}>✏ Edit</button>
                <button onClick={() => handleDeleteArticle(article.id)}>❌ Delete</button>
              </li>
            ))
          ) : (
            <p>No articles found.</p>
          )}
        </ul>
      )}
    </div>
  );
};

export default Articles;
