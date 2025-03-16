import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./PracticeAreas.css";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import notarialServicesImg from "../../assets/documents.jpg";
import HomeNavLink from "../Navbar/HomeNavLink";
function NotarialServices() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"Notarial Services & Certificates"} />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>Notarial Services & Certificates</h1>
          <div className="main-area-text">
            <h7>
              Our Notarial Services & Certificates practice offers essential
              legal support in the authentication and verification of documents,
              ensuring that our clients meet the requirements for various
              transactions and legal processes. We provide reliable notarial
              services to both individuals and businesses, facilitating smooth
              legal operations and compliance.
            </h7>
            <h7>
              We assist clients with the preparation and notarization of
              important documents, including powers of attorney, affidavits,
              contracts, and property deeds. Our notarial services help ensure
              that these documents are legally binding and recognized by
              relevant authorities.
            </h7>
          </div>
          <div className="img-container">
            <img
              src={notarialServicesImg}
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
            <h7>Document Notarization</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>{" "}
            <h7>Powers of Attorney & Affidavits</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Real Estate Deeds & Contracts</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Corporate Notarial Services</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Verification of Signatures & Identity</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Certificates of Good Standing</h7>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default NotarialServices;
