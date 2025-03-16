import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";

export default function ArticlesDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Fetching article with ID:", id); // ✅ Debugging line

    axios
      .get(`http://localhost:5000/api/articles/${id}`)
      .then((response) => {
        if (response.data) {
          console.log("✅ Article fetched:", response.data);
          setArticle(response.data);
        } else {
          console.log("⚠️ No article found for this ID");
          setError("Article not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("❌ Error fetching article:", error.response ? error.response.data : error.message);
        setError("Failed to load article. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  return (
    <section>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        {loading ? (
          <p className="text-center text-gray-500">🔄 Loading article...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : article ? (
          <div>
            <h1 className="text-3xl font-bold text-[#024677]">{article.title}</h1>
            <p className="text-gray-600 text-sm mt-2">By {article.author} | 📅 {new Date(article.date).toDateString()}</p>
            <img 
              src={article.image || "https://source.unsplash.com/800x400/?news"} 
              alt={article.title} 
              className="w-full rounded-lg my-4" 
            />
            <p className="text-gray-700 leading-relaxed">{article.description}</p>

            {/* Additional Content */}
            {article.subtitle1 && <h3 className="text-xl font-semibold mt-6">{article.subtitle1}</h3>}
            {article.description1 && <p className="text-gray-600">{article.description1}</p>}
            {article.subtitle2 && <h3 className="text-xl font-semibold mt-6">{article.subtitle2}</h3>}
            {article.description2 && <p className="text-gray-600">{article.description2}</p>}
          </div>
        ) : (
          <p className="text-center text-gray-500">⚠️ No article available.</p>
        )}
      </div>
      <Contact />
      <Footer />
    </section>
  );
}
