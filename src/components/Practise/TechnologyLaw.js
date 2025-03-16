import React from "react";
import "./PracticeAreas.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import technologyImg from "../../assets/technology-law.jpg";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import HomeNavLink from "../Navbar/HomeNavLink";
function TechnologyLaw() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg
        title={"Technology, Intellectual Property (IP) & Internet Law"}
      />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>
            Technology,Intellectual Property
            <br /> (IP)&Internet Law
          </h1>
          <div className="main-area-text">
            <h7>
              Our Technology, Intellectual Property (IP) & Internet Law
              practices focus on advising tech-companies on the legal principles
              and legislation that govern the use of internet in all its forms.
            </h7>
            <h7>
              We also advise tech-companies and individuals on their intangible
              assets that range from literary works to new technologies through
              patent, copyright and trademark registration.
            </h7>
          </div>
          <div className="img-container">
            <img src={technologyImg} alt="technology-Img" className="img"></img>
          </div>
        </div>
        <div className="focus-areas">
          <div className="horizontal-bar"></div>
          <h1>Experience Highlights</h1>

          <div className="focus-area">
            <h7>
              We are currently advising a technological social enterprise
              developing edge technology, leveraging the power of machine
              learning and artificial learning and artificial intelligence, to
              address the communication barrier between the deaf and the
              hearing/blind, enabling a two-way communication with no need of
              the hearing/blind understanding sign language.
            </h7>
          </div>
          <div className="focus-area">
            <h7>
              We are currently advising a tech-company on protection of their
              products from use by others.
            </h7>
          </div>
        </div>
      </div>
      <Footer />
      <Contact />
    </section>
  );
}

export default TechnologyLaw;
