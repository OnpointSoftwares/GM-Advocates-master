import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PersonProfile.css";
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

  // Use useCallback to prevent unnecessary re-renders
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
  }, [name]); // Ensure it's updated when name changes

  useEffect(() => {
    fetchTeamMember();
  }, [fetchTeamMember]); // Add fetchTeamMember to dependencies

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="person-profile">
      <Navbar HomeLinkToRender={HomeNavLink} />

      {member ? (
        <div className="profile-container">
          <img 
            src={member.profile_picture ? `${BASE_URL}${member.profile_picture}` : "https://via.placeholder.com/150"} 
            alt={member.full_name} 
          />
          <div className="profile-info">
            <h2>{member.full_name}</h2>
            <h4>{member.position}</h4>
            <p>{member.bio}</p>
            <p>Email: {member.email}</p>
            <p>Phone: {member.phone}</p>

            {/* Navigation Buttons */}
            <div className="profile-buttons">
              <button className="go-back" onClick={() => navigate(-1)}>🔙 Go Back</button>
              <button className="close-profile" onClick={() => navigate("/")}>❌ Close Profile</button>
            </div>
          </div>
        </div>
      ) : (
        <p className="error">Member not found.</p>
      )}

      <Contact />
      <Footer />
    </div>
  );
}

export default PersonProfile;
