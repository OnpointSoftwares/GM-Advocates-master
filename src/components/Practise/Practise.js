import React from "react";
import "./Practise.css";
import Chamber from "../../assets/chamber.jpg";
import Hammer from "../../assets/judge_hammer.jpg";
import Justice from "../../assets/justice.jpg";
import Law from "../../assets/law.jpg";
import Lawfirm from "../../assets/law-firm.jpg";
// import { Link } from "react-scroll";
import { Link } from "react-router-dom";
function Practise() {
  return (
    <section id="practise-area" className="practise-area">
      <span className="practiseTitle">Practise Areas</span>

      <div className="practise-area-cards">
        <div className=" practise-area-card">
          <img src={Chamber} alt="" className="practise-area-img"></img>
          <h className="areaTitle"> Litigation & Dispute Resolution</h>
          <Link to="/litigation-dispute" className="cardLink">
            Learn More{" "}
          </Link>
        </div>
        <div className=" practise-area-card">
          <img src={Hammer} alt="" className="practise-area-img"></img>
          <h className="areaTitle">Technology & Internet Law</h>
          <Link to="/technology-ip-internetlaw" className="cardLink">
            Learn More{" "}
          </Link>
        </div>
        <div className=" practise-area-card">
          <img src={Justice} alt="" className="practise-area-img"></img>
          <h className="areaTitle">Corporate & Commercial Law</h>
          <Link to="/corporate-commercial-law/" className="cardLink">
            Learn More{" "}
          </Link>{" "}
        </div>
        <div className=" practise-area-card">
          <img src={Law} alt="" className="practise-area-img"></img>
          <h className="areaTitle">Real Estate & Property Law</h>
          <Link to="/real-estate-property-law/" className="cardLink">
            Learn More{" "}
          </Link>
        </div>
        <div className=" practise-area-card">
          <img src={Lawfirm} alt="" className="practise-area-img"></img>
          <h className="areaTitle">Aviation Law & Practice</h>
          <Link to="/aviation-law-practise/" className="cardLink">
            Learn More{" "}
          </Link>{" "}
        </div>
        <div className=" practise-area-card">
          <img src={Chamber} alt="" className="practise-area-img"></img>
          <h className="areaTitle">Procurement Law</h>
          <Link to="/procurement-law/" className="cardLink">
            Learn More{" "}
          </Link>{" "}
        </div>
      </div>
    </section>
  );
}

export default Practise;
