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
      const response = await axios.get("https://home.gmorinaadvocates.org/api/articles");
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
          className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${showAddArticleForm ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'} text-white`}
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

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 flex items-center gap-2">
            <X className="w-5 h-5" /> {error}
          </p>
        </div>
      )}

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search articles..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>


      {/* Add/Edit Article Form */}
      {(showAddArticleForm || editingArticle) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <form 
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
            onSubmit={editingArticle ? handleUpdateArticle : handleAddArticle}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                {editingArticle ? 'Edit Article' : 'Add New Article'}
              </h3>
              <button
                type="button"
                onClick={() => editingArticle ? setEditingArticle(null) : setShowAddArticleForm(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="Enter article title"
                  value={editingArticle ? editingArticle.title : newArticle.title}
                  onChange={(e) => editingArticle 
                    ? setEditingArticle({ ...editingArticle, title: e.target.value })
                    : setNewArticle({ ...newArticle, title: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  placeholder="Enter author name"
                  value={editingArticle ? editingArticle.author : newArticle.author}
                  onChange={(e) => editingArticle
                    ? setEditingArticle({ ...editingArticle, author: e.target.value })
                    : setNewArticle({ ...newArticle, author: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={editingArticle ? editingArticle.date : newArticle.date}
                  onChange={(e) => editingArticle
                    ? setEditingArticle({ ...editingArticle, date: e.target.value })
                    : setNewArticle({ ...newArticle, date: e.target.value })
                  }
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-blue-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => editingArticle
                        ? setEditingArticle({ ...editingArticle, image: e.target.files[0] })
                        : setNewArticle({ ...newArticle, image: e.target.files[0] })
                      }
                      className="hidden"
                    />
                    <div className="flex flex-col items-center gap-2 text-gray-600">
                      <Image className="w-6 h-6" />
                      <span className="text-sm">Click to upload image</span>
                    </div>
                  </label>
                  {(editingArticle?.image || newArticle.image) && (
                    <div className="w-20 h-20 relative">
                      <img
                        src={editingArticle?.image ? `https://home.gmorinaadvocates.org/uploads/${editingArticle.image}` : URL.createObjectURL(newArticle.image)}
                        alt="Preview"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <ReactQuill
                  value={editingArticle ? editingArticle.description : newArticle.description}
                  onChange={editingArticle ? handleEditDescriptionChange : handleDescriptionChange}
                  modules={modules}
                  formats={formats}
                  className="bg-white rounded-md"
                  style={{ height: "200px" }}
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => editingArticle ? setEditingArticle(null) : setShowAddArticleForm(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    {editingArticle ? 'Update' : 'Save'} Article
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Articles List */}
      {loading && !articles.length ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles
            .filter(article => 
              article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              article.author.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map(article => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                {article.image && (
                  <img
                    src={`https://home.gmorinaadvocates.org/uploads/${article.image}`}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{article.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    By {article.author} • {new Date(article.date).toLocaleDateString()}
                  </p>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditArticle(article)}
                      className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-md transition-colors"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteArticle(article.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
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
