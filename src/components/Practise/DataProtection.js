import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./PracticeAreas.css";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import dataprotectionImg from "../../assets/crypto.jpeg";
import HomeNavLink from "../Navbar/HomeNavLink";
function DataProtection() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"IT, Data Protection & Crypto"} />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>IT, Data Protection & Crypto</h1>
          <div className="main-area-text">
            <h7>
              Our IT, Data Protection & Cryptocurrency Law practice provides
              specialized legal support in managing the challenges and
              opportunities that arise from technology, privacy regulations, and
              digital assets. We assist clients in navigating complex areas such
              as IT agreements, data privacy laws, and cryptocurrency
              compliance.
            </h7>
            <h7>
              With a strong foundation in IT law, we help businesses secure
              technology contracts, manage software licensing, and address
              cybersecurity risks.
            </h7>
          </div>
          <div className="img-container">
            <img
              src={dataprotectionImg}
              alt="litigation-Img"
              className="img"
            ></img>
          </div>
        </div>
        <div className="focus-areas">
          <div className="horizontal-bar"></div>
          <h1>Areas of Focus</h1>

          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Technology & Software Licensing</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>{" "}
            <h7>Cybersecurity Compliance</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Data Privacy (GDPR & CCPA)</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Cryptocurrency Taxation & Disputes</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Blockchain & Cryptocurrency Regulation</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Data Breach Response</h7>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default DataProtection;
