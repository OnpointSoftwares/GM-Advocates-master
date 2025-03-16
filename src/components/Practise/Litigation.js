import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./PracticeAreas.css";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import litigationImg from "../../assets/Litigation-and-Dispute-Resolution.jpg";
import HomeNavLink from "../Navbar/HomeNavLink";
function Litigation() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"Litigation & Dispute Resolution"} />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>Litigation & Dispute Resolution</h1>
          <div className="main-area-text">
            <h7>
              Our Litigation & Dispute Resolution practice focuses on solving
              disputes relating to employment and labour relations, environment
              and land disputes, constitutional human rights law, family and
              succession law and procurement disputes.
            </h7>
            <h7>
              Our team is well equipped with skills and knowhow to guide our
              clients through the dispute resolution process.
            </h7>
          </div>
          <div className="img-container">
            <img src={litigationImg} alt="litigation-Img" className="img"></img>
          </div>
        </div>
        <div className="focus-areas">
          <div className="horizontal-bar"></div>
          <h1>Areas of Focus</h1>

          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Constitutional & Human Rights Law</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i> <h7>Criminal Litigation</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Family & Succession Law</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Arbitration & Mediation</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Defamation Law</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Policy Formulation & Legislative Drafting</h7>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default Litigation;
