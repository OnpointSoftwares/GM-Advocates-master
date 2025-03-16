import React from "react";
import "./PracticeAreas.css";
import aviationImg from "../../assets/airplane-runway.jpg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import HomeNavLink from "../Navbar/HomeNavLink";
function AviationLawPractise() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"Aviation Law & Practice"} />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>Aviation Law & Practice</h1>
          <div className="main-area-text">
            <h7>
              We advise on a full range of aviation issues including major loss,
              emergency response and liability as well as non-contentious work
              including regulation, finance and employment.
            </h7>
          </div>
          <div className="img-container">
            <img src={aviationImg} alt="litigation-Img" className="img"></img>
          </div>
        </div>
        <div className="focus-areas">
          <div className="horizontal-bar"></div>
          <h1>Our Aviation Services</h1>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Fleet procurement</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>{" "}
            <h7>Commercial Dispute Resolution</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Debt Recovery</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Environmental Claims/Toxic exposure</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Finance & Leasing</h7>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default AviationLawPractise;
