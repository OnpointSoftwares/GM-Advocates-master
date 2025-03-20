import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaArrowLeft, FaFacebook, FaTwitter, FaLinkedin, FaWhatsapp } from "react-icons/fa"; 
import Navbar from "../components/Navbar/Navbar";
import HomeNavLink from "../components/Navbar/HomeNavLink";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleUrl, setArticleUrl] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/articles/${id}`)
      .then((response) => {
        console.log("✅ Article fetched successfully:", response.data);
        setArticle(response.data);
        setLoading(false);
        setArticleUrl(window.location.href);

        // Dynamically update meta tags for Facebook & LinkedIn
        document.title = response.data.title;

        const metaTags = [
          { property: "og:title", content: response.data.title },
          { property: "og:description", content: response.data.description },
          { property: "og:url", content: window.location.href },
          { property: "og:image", content: response.data.image || "https://source.unsplash.com/800x400/?news" },
          { property: "og:type", content: "article" },
          { name: "twitter:title", content: response.data.title },
          { name: "twitter:description", content: response.data.description },
          { name: "twitter:image", content: response.data.image || "https://source.unsplash.com/800x400/?news" },
          { name: "twitter:card", content: "summary_large_image" },
        ];

        metaTags.forEach(({ property, name, content }) => {
          let metaElement = document.querySelector(`meta[${property ? "property" : "name"}="${property || name}"]`);
          if (!metaElement) {
            metaElement = document.createElement("meta");
            metaElement.setAttribute(property ? "property" : "name", property || name);
            document.head.appendChild(metaElement);
          }
          metaElement.setAttribute("content", content);
        });

      })
      .catch((error) => {
        console.error("❌ Error fetching article:", error.response ? error.response.data : error.message);
        setError("Failed to load article. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  return (
    <section>
      <Navbar HomeLinkToRender={HomeNavLink} />

      {/* Article Container */}
      <div className="min-h-screen bg-gray-100 flex justify-center px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-lg mt-10">

          {/* Back Button */}
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            <FaArrowLeft className="mr-2" /> Back to Articles
          </button>

          {loading ? (
            <p className="text-center text-gray-500 mt-6">🔄 Loading article...</p>
          ) : error ? (
            <p className="text-center text-red-500 mt-6">{error}</p>
          ) : article ? (
            <>
              {/* Article Header */}
              <h2 className="text-sm text-gray-600 mt-6">Live From GM ORINA & CO. ADVOCATES</h2>
              <h1 className="text-3xl text-[#024677] font-bold mt-2">{article.title}</h1>
              <p className="text-gray-500 text-sm mt-2">
                📍 Posted by <span className="text-blue-600 underline">{article.author}</span>, 
                <span className="text-blue-600 underline"> {new Date(article.date).toDateString()}</span>
              </p>

              {/* Article Image */}
              <div className="mt-6">
                <img 
                  src={article.image || "https://source.unsplash.com/800x400/?news"} 
                  alt="blog" 
                  className="w-full rounded-lg shadow-md"
                />
              </div>

              {/* Article Content */}
              <p className="text-gray-700 mt-6 leading-relaxed">{article.description}</p>

              {/* Subsections */}
              {[1, 2, 3, 4].map((num) => (
                article[`subtitle${num}`] && (
                  <div key={num} className="mt-6">
                    <h3 className="text-xl font-bold text-[#024677]">{article[`subtitle${num}`]}</h3>
                    <p className="text-gray-700 mt-2 leading-relaxed">{article[`description${num}`]}</p>
                  </div>
                )
              ))}
              <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:space-x-4 bg-gray-100 p-4 rounded-lg shadow-md">
  <p className="text-gray-700 font-medium mb-2 sm:mb-0">📢 Share this article:</p>

  <div className="flex space-x-4">
    {/* Facebook */}
    <a 
      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}&quote=${encodeURIComponent(article.title)}`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-white bg-blue-600 p-2 rounded-full hover:bg-blue-800 transition"
    >
      <FaFacebook size={20} />
    </a>

    {/* Twitter */}
    <a 
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(articleUrl)}&text=${encodeURIComponent(article.title + " - " + article.description)}`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-white bg-blue-400 p-2 rounded-full hover:bg-blue-600 transition"
    >
      <FaTwitter size={20} />
    </a>

    {/* LinkedIn */}
    <a 
      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(articleUrl)}&title=${encodeURIComponent(article.title)}&summary=${encodeURIComponent(article.description)}&source=GM ORINA & CO. ADVOCATES`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-white bg-blue-700 p-2 rounded-full hover:bg-blue-900 transition"
    >
      <FaLinkedin size={20} />
    </a>

    {/* WhatsApp */}
    <a 
      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + " - " + article.description + " Read more: " + articleUrl)}`} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-white bg-green-500 p-2 rounded-full hover:bg-green-700 transition"
    >
      <FaWhatsapp size={20} />
    </a>
  </div>
</div>


            </>
          ) : (
            <p className="text-center text-gray-500 mt-6">⚠️ Article not found.</p>
          )}
        </div>
      </div>

      <Contact />
      <Footer />
    </section>
  );
}
