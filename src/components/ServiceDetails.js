import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "./Contact/Contact";

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/practice-areas/${id}`)
      .then((response) => {
        setService(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching service details:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <section className="practise-area">
        <Navbar />
        <PractiseAreaBg title="Loading..." />
        <div className="practise-area-content text-center">
          <p className="text-gray-500">Loading service details...</p>
        </div>
        <Footer />
      </section>
    );
  }

  if (!service) {
    return (
      <section className="practise-area">
        <Navbar />
        <PractiseAreaBg title="Service Not Found" />
        <div className="practise-area-content text-center">
          <p className="text-red-500">Sorry, the requested service does not exist.</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition" 
            onClick={() => navigate(-1)}
          >
            ← Go Back
          </button>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <section className="practise-area">
      <Navbar />
      <PractiseAreaBg title={service.title} />
      <div className="practise-area-content px-6 py-4">
        {/* 🔹 Tailwind-Styled "Go Back" Button */}
        <button 
          className="mb-6 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => navigate(-1)}
        >
          ← Go Back
        </button>

        <div className="main-area">
          <div className="border-t-4 border-blue-500 w-16 mb-4"></div>
          <h1 className="text-2xl font-bold">{service.title}</h1>
          <div className="main-area-text mt-4">
            <p className="text-gray-700">{service.description}</p>
          </div>
          {service.image && (
            <div className="mt-6">
              <img 
                src={`http://localhost:5000${service.image}`} 
                alt={service.title} 
                className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>

        <div className="focus-areas mt-8">
          <div className="border-t-4 border-blue-500 w-16 mb-4"></div>
          <h1 className="text-2xl font-bold">Our {service.title} Services</h1>
          {service.focusAreas && service.focusAreas.length > 0 ? (
            <ul className="mt-4 space-y-2">
              {service.focusAreas.map((area, index) => (
                <li key={index} className="flex items-center">
                  <i className="fa fa-caret-right text-blue-500 mr-2"></i>
                  <span className="text-gray-800">{area}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">No specific focus areas listed for this service.</p>
          )}
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
};

export default ServiceDetails;
