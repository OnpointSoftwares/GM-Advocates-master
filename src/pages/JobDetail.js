import React from "react";
import Navbar from "../components/Navbar/Navbar";
import JobDetailBg from "./JobDetailBg";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import "./JobDetail.css";
import HomeNavLink from "../components/Navbar/HomeNavLink";
import { useLocation } from "react-router-dom";
const JobDetail = () => {
  const location = useLocation();
  const { job } = location.state;
  return (
    <section className="job-detail">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <JobDetailBg name={job.name} location={job.location} type={job.jobType} />

      <div className="description-container">
        <div className="description">
          <h1>Vacancy Description</h1>
          <p>{job.description}</p>
          <p>
            To apply forwad your resume and cover letter to
            <span> info@gmorinaadvocates.com </span>
          </p>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
};

export default JobDetail;
