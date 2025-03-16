import "./PracticeAreas.css";
import procurementImg from "../../assets/procurement.jpg";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import React from "react";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import HomeNavLink from "../Navbar/HomeNavLink";
function ProcurementLaw() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"Procurement Law"} />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>Procurement Law</h1>
          <div className="main-area-text">
            <h7>
              We offer legal representation and advise entities on how to
              resolve disputes/potential disputes that arise from the
              loss/damage suffered due to breach of duty imposed on a procuring
              entity by the Public Procurement and Disposal Act, 2015.
            </h7>
          </div>
          <div className="img-container">
            <img
              src={procurementImg}
              alt="litigation-Img"
              className="img"
            ></img>
          </div>
        </div>
        <div className="focus-areas">
          <div className="horizontal-bar"></div>
          <h1>We advise state entities on</h1>

          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>procurement planning</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>{" "}
            <h7>procurement processing</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Inventory and asset management</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>diposal of assets</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>contract management</h7>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default ProcurementLaw;
