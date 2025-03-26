import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import "./People.css";
import PersonCard from "./PersonCard";
import OurPeopleBg from "./OurPeopleBg";
import Navbar from "../Navbar/Navbar";
import Contact from "../Contact/Contact";
import Footer from "../Footer/Footer";
import HomeNavLink from "../Navbar/HomeNavLink";

const BASE_URL = "https://home.gmorinaadvocates.org";

function People() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  const fetchTeamMembers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(`${BASE_URL}https://home.gmorinaadvocates.org/api/team-members`);
      setTeamMembers(response.data);
    } catch (error) {
      setError("Failed to load team members. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <OurPeopleBg />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center py-10"
      >
        <h2 className="text-3xl font-bold text-gray-800">
          Meet Our Dedicated Team
        </h2>
        <p className="text-gray-600 mt-2">
          Get to know the professionals behind our success.
        </p>
      </motion.div>

      {/* Content Section */}
      <div className="container mx-auto px-6 pb-16">
        {error && (
          <div className="text-red-600 text-center">
            {error}
            <button
              onClick={fetchTeamMembers}
              className="bg-red-500 text-white px-4 py-2 rounded-md ml-4"
            >
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
          </div>
        ) : teamMembers.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {teamMembers.map((member) => (
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
            ))}
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">No team members found.</p>
        )}
      </div>

      <Contact />
      <Footer />
    </div>
  );
}

export default People;
