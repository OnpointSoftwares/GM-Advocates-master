import React from "react";
import "./PracticeAreas.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import realEstateImg from "../../assets/real_estate.jpg";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import HomeNavLink from "../Navbar/HomeNavLink";
function RealEstateProperty() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"Real Estate & Property Law"} />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>Real Estate & Property Law</h1>
          <div className="main-area-text">
            <h7>
              We provide support for home buyers, investors, developers, local
              authorities, banks and housing corporations.
            </h7>
          </div>
          <div className="img-container">
            <img src={realEstateImg} alt="realEstate-Img" className="img"></img>
          </div>
        </div>
        <div className="focus-areas">
          <div className="horizontal-bar"></div>
          <div className="focus-area">
            <h7>
              Environmental planning and compliance with regulations, licenses,
              tenders and public private partnerships.
            </h7>
          </div>
          <div className="focus-area">
            <h7>
              Registration/recording of conveyances, leases and real estate
              security interests.
            </h7>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default RealEstateProperty;
