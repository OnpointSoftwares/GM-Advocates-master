import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import HomeNavLink from "../Navbar/HomeNavLink";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import "./articles.css";

export default function BlogGrid() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch articles from API
  useEffect(() => {
    axios
      .get("/api/articles")
      .then((response) => {
        console.log("✅ Articles fetched successfully:", response.data);
        setArticles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching articles:", error.response ? error.response.data : error.message);
        setError("Failed to load articles. Please try again later.");
        setLoading(false);
      });
  }, []);

  return (
    <section>
      <Navbar HomeLinkToRender={HomeNavLink} />

      {/* 🔹 Background Section */}
      <div className="articles-bg">
        <h1 className="title">Our Articles</h1>
        <p className="subtitle">Stay updated with the latest insights and news</p>
      </div>

      <div className="max-w-6xl mx-auto py-12 px-6">
        {loading ? (
          <p className="text-center text-gray-500">🔄 Loading articles...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : articles.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {articles.map((article) => (
              <Link key={article.id} className="card-link" to={`/articles/${article.id}`}>
                <div className="p-6 rounded-2xl shadow-lg border border-gray-200 hover:bg-gray-100 transition duration-300 transform hover:scale-105">
                  <div className="flex gap-4">
                    {/* Article Image */}
                    <img
                      src={article.image ? `/uploads/${article.image}` : "https://source.unsplash.com/100x100/?news,technology"}
                      alt={article.title}
                      className="w-16 h-16 rounded-lg border-2 border-blue-500"
                    />
                    {/* Article Details */}
                    <div className="flex-1">
                      <p className="text-blue-600 font-semibold">{article.author}</p>
                      <h2 className="text-xl font-bold text-[#024677]">{article.title}</h2>
                      {/* Render rich text content from text editor */}
                      <div
                        className="text-gray-600 text-sm mt-2"
                        dangerouslySetInnerHTML={{
                          __html: article.description.substring(0, 150) + "...",
                        }}
                      />
                      <p className="text-gray-400 text-xs mt-2">
                        📌 {new Date(article.date).toDateString()}
                      </p>
                      {/* 🚀 "Read More" Button */}
                      <Link to={`/articles/${article.id}`} className="mt-4 inline-block text-blue-600 font-semibold hover:text-blue-800 transition">
                        Read More →
                      </Link>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">⚠️ No articles available yet.</p>
        )}
      </div>

      <Contact />
      <Footer />
    </section>
  );
}
