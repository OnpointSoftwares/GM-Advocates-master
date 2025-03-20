import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import HomeNavLink from "../Navbar/HomeNavLink";

const BASE_URL = "http://localhost:5000";

function PersonProfile() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch team member details
  const fetchTeamMember = useCallback(async () => {
    try {
      const formattedName = decodeURIComponent(name).replace(/-/g, " ");
      const response = await axios.get(`${BASE_URL}/api/team-members/${formattedName}`);
      setMember(response.data);
      setLoading(false);
    } catch (error) {
      setError("Team member not found");
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchTeamMember();
  }, [fetchTeamMember]);

  if (loading) return <p className="text-center text-gray-600 mt-6">🔄 Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar HomeLinkToRender={HomeNavLink} />

      {member ? (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <img
              src={member.profile_picture ? `${BASE_URL}${member.profile_picture}` : "https://via.placeholder.com/150"}
              alt={member.full_name}
              className="w-40 h-40 rounded-full shadow-md"
            />
            <h2 className="text-2xl font-bold text-gray-900 mt-4">{member.full_name}</h2>
            <h4 className="text-lg text-blue-600 mt-1">{member.position}</h4>
          </div>

          {/* Profile Information */}
          <div className="mt-6 text-center">
            <p className="text-gray-700 text-lg leading-relaxed">{member.bio}</p>
            <p className="mt-3 text-gray-600">
              📧 Email: <span className="font-medium text-blue-500">{member.email}</span>
            </p>
            <p className="text-gray-600">
              📞 Phone: <span className="font-medium text-blue-500">{member.phone}</span>
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center mt-6 space-x-4">
            <button
              onClick={() => navigate(-1)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition"
            >
              🔙 Go Back
            </button>
            <button
              onClick={() => navigate("/")}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-red-600 transition"
            >
              ❌ Close Profile
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">⚠️ Member not found.</p>
      )}

      <Contact />
      <Footer />
    </div>
  );
}

export default PersonProfile;
