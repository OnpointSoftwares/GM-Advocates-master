import React from "react";
import { useLocation } from "react-router-dom";
import HomeNavLink from "../components/Navbar/HomeNavLink";
import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
function ArticlesDetail() {
  const location = useLocation();
  const { article } = location.state;
  return (
    <section>
      <Navbar HomeLinkToRender={HomeNavLink} />
      <div className="min-h-screen  bg-gray-100 flex justify-center">
        <div className="w-2/3 max-w-6xl p-6 bg-white shadow-lg">
          {/* Header */}
          <h2 className="text-sm text-gray-600">
            Live From GM ORINA $ CO. ADVOCATES
          </h2>
          <h1 className="text-3xl text-[#024677] font-bold mt-2 w-2/3">
            {article.title}
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            📍 Posted by{" "}
            <span className="text-blue-600 underline">{article.author}</span>,{" "}
            <span className="text-blue-600 underline">{article.date}</span>
          </p>

          {/* Main Content */}
          <div className="mt-6 flex flex-col lg:flex-row gap-8">
            {/* Left - Blog Content */}
            <div className="w-full lg:w-3/4">
              <img
                src={article.image}
                alt="blog"
                className="w-full rounded-lg shadow-md"
              />
              <p className="text-gray-700 mt-4">{article.description}</p>
              <div mt-2>
                <h3 className="text-xl font-bold text-[#024677]">
                  {article.subtitle1}
                </h3>
                <p className="text-gray-700">{article.description1}</p>
                <ol className="list-[lower-alpha]  pl-4 space-y-2 text-justify">
                  <li>
                    <p className="text-gray-700">{article.desc1l1}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc1l2}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc1l3}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc1l4}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc1l5}</p>
                  </li>
                </ol>
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-bold text-[#024677]">
                  {article.subtitle2}
                </h3>
                <p className="text-gray-700">{article.description2}</p>
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-bold text-[#024677]">
                  {article.subtitle3}
                </h3>
                <p className="text-gray-700">{article.description3}</p>
                <ol className="list-[lower-alpha]  pl-4 space-y-2 text-justify">
                  <li>
                    <p className="text-gray-700">{article.desc3l1}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc3l2}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc3l3}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc3l4}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc3l5}</p>
                  </li>
                </ol>
              </div>
              <div className="mt-2">
                <h3 className="text-xl font-bold text-[#024677]">
                  {article.subtitle3}
                </h3>
                <p className="text-gray-700">{article.description3}</p>
                <ol className="list-[lower-alpha]  pl-4 space-y-2 text-justify">
                  <li>
                    <p className="text-gray-700">{article.desc4l1}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc4l2}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc4l3}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc4l4}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc4l5}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc4l6}</p>
                  </li>
                  <li>
                    <p className="text-gray-700">{article.desc4l7}</p>
                  </li>
                </ol>
              </div>
              <div className="mt-2">
                <p className="text-gray-700">{article.description5}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default ArticlesDetail;
