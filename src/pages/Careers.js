import React from "react";
import { Link } from "react-router-dom";
import "./careers.css";

import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import careersImg from "../assets/office.jpg";
import Contact from "../components/Contact/Contact";
import HomeNavLink from "../components/Navbar/HomeNavLink";
import PractiseAreaBg from "../components/Practise/PractiseAreaBg";
import { jobs } from "../constants/jobs";

function Careers() {
  return (
    <section className="careers-page">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"careers "} />

      <div className="careers-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>Join Our Team</h1>
          <div className="main-area-text">
            <p>
              At our firm, we believe in nurturing talent and providing an
              environment where you can gain invaluable experience. Working with
              us, you'll have the opportunity to engage in diverse legal
              matters, hone your skills, and grow professionally. Our team is
              dedicated to guiding you through your career journey, ensuring you
              gain the knowledge and expertise needed to excel in the legal
              field.
            </p>
          </div>
          <div className="img-container">
            <img src={careersImg} alt="careers-background" className="img" />
          </div>
        </div>
        <div className="focus-areas">
          <div className="horizontal-bar"></div>
          <h1>Perks of Working with Us</h1>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Comprehensive Health Benefits</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Professional Development Opportunities</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Flexible Working Hours</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Generous Paid Time Off</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Collaborative Work Environment</h7>
          </div>
        </div>
      </div>
      <div className="vacancies">
        <h1 className="v-title">Available Vacancies</h1>
        <div className="row">
          {jobs.map((job, index) => (
            <div className="card-container" key={index}>
              <Link
                className="card-link"
                to={`/job/${index}`}
                state={{ job: job }}
              >
                <div className="vacancy-card">
                  <p className="job-type">{job.jobType}</p>
                  <p className="job">{job.name}</p>
                  <p className="job-location">{job.location}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Contact />
      <Footer />
    </section>
  );
}

export default Careers;
