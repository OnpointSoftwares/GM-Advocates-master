import React, { useState, useEffect } from "react";
import axios from "axios";
import "./People.css";
import PersonCard from "./PersonCard";
import OurPeopleBg from "./OurPeopleBg";
import Navbar from "../Navbar/Navbar";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import HomeNavLink from "../Navbar/HomeNavLink";

const BASE_URL = "http://localhost:5000";

function People() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/team-members`);
      setTeamMembers(response.data);
      setLoading(false);
    } catch (error) {
      setError("Failed to load team members");
      setLoading(false);
    }
  };

  return (
    <div className="people">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <OurPeopleBg />
      <div className="our-people">
        {error && <p className="error">{error}</p>}
        {loading ? (
          <p>Loading team members...</p>
        ) : teamMembers.length > 0 ? (
          teamMembers.map((member) => (
            <PersonCard
              key={member.id}
              profilePic={
                member.profile_picture
                  ? `${BASE_URL}${member.profile_picture}`
                  : "https://via.placeholder.com/100"
              }
              profileLink={`/our-people/${member.full_name.replace(/\s+/g, "-").toLowerCase()}/`}
              firstName={member.full_name.split(" ")[0]}
              lastName={member.full_name.split(" ")[1] || ""}
              position={member.position}
            />
          ))
        ) : (
          <p>No team members found.</p>
        )}
      </div>
      <Contact />
      <Footer />
    </div>
  );
}

export default People;
