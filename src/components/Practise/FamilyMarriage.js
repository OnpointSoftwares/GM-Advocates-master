import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./PracticeAreas.css";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import familyMarriageImg from "../../assets/family.jpeg";
import HomeNavLink from "../Navbar/HomeNavLink";
function FamilyMarriage() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"Family, Marriage & Succession"} />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>Family, Marriage & Succession</h1>
          <div className="main-area-text">
            <h7>
              Our Family, Marriage & Succession Law practice offers
              comprehensive legal support in all matters relating to family
              relationships, marriage, and inheritance. We are committed to
              helping clients navigate personal and sensitive legal challenges
              with clarity and compassion.
            </h7>
            <h7>
              In marriage and matrimonial disputes, we offer advice on spousal
              support, property division, and settlement agreements. In the area
              of succession law, we guide clients through estate planning,
              drafting wills, and managing probate processes.
            </h7>
          </div>
          <div className="img-container">
            <img
              src={familyMarriageImg}
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
            <h7>Divorce & Separation</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>{" "}
            <h7>Child Custody & Support</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Inheritance Disputes</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Estate Planning & Will Drafting</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Family Mediation & Dispute Resolution</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Spousal Support & Property Division</h7>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default FamilyMarriage;
