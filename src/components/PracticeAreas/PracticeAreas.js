import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";
import "./PracticeAreas.css"; // External CSS for hero section styling

const PracticeAreas = () => {
  const [practiceAreas, setPracticeAreas] = useState([]);
  const [expandedAreas, setExpandedAreas] = useState({}); // Track expanded sections
  const [showAll, setShowAll] = useState(false); // Control visibility of practice areas
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/practice-areas")
      .then((response) => {
        console.log("Practice Areas Data:", response.data); // Debugging
        setPracticeAreas(response.data);
      })
      .catch((error) => {
        console.error("Error fetching practice areas:", error);
      });
  }, []);

  // Toggle View More / View Less
  const toggleExpand = (id) => {
    setExpandedAreas((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to handle "Learn More" button click
  const handleLearnMore = (area) => {
    const areaId = area._id || area.id; // Ensure correct ID extraction
    console.log("Navigating to:", `/services/${areaId}`); // Debugging log
    if (areaId) {
      navigate(`/services/${areaId}`);
    } else {
      console.error("Error: ID is undefined", area);
    }
  };

  return (
    <section id="practice-areas">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Welcome to Our Practice Areas</h1>
        <p className="hero-subtext">
          Explore our diverse range of professional services. We are committed to delivering excellence.
        </p>
      </div>

      {/* Practice Areas Grid */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center text-[#024677] mb-12">Our Practice Areas</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {practiceAreas.length > 0 ? (
            (showAll ? practiceAreas : practiceAreas.slice(0, 3)).map((area) => (
              <div key={area._id} className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
                {/* Image */}
                {area.image ? (
                  <img
                    src={`http://localhost:5000${area.image}`}
                    alt={area.title}
                    className="w-full h-48 object-cover"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                ) : (
                  <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-500">
                    No Image Available
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-[#024677]">{area.title}</h3>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {expandedAreas[area._id] || area.description.length <= 150
                      ? area.description
                      : `${area.description.substring(0, 150)}...`}
                  </p>

                  {/* View More / View Less Toggle */}
                  {area.description.length > 150 && (
                    <button
                      onClick={() => toggleExpand(area._id)}
                      className="text-[#024677] font-medium mt-2 hover:underline focus:outline-none"
                    >
                      {expandedAreas[area._id] ? "View Less" : "View More"}
                    </button>
                  )}

                  {/* Areas of Focus */}
                  {area.areas_of_focus && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-800">Areas of Focus:</h4>
                      <ul className="list-none text-[#024677] text-sm">
                        {area.areas_of_focus.split(",").map((focus, index) => (
                          <li key={index}>
                            <a
                              href={`/focus/${focus.trim().replace(/\s+/g, "-").toLowerCase()}`}
                              className="hover:underline"
                            >
                              {focus.trim()}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Call to Action */}
                  <div className="mt-6">
                    <button
                      onClick={() => handleLearnMore(area)}
                      className="inline-block px-6 py-2 bg-[#024677] text-white font-medium rounded-lg hover:bg-[#012b4d] transition duration-300"
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-3">No practice areas available.</p>
          )}
        </div>

        {/* Show More / Show Less Button */}
        {practiceAreas.length > 3 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-2 border border-[#024677] text-[#024677] font-medium rounded-lg hover:bg-[#024677] hover:text-white transition duration-300"
            >
              {showAll ? "See Less Practice Areas" : "See More Practice Areas"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default PracticeAreas;
