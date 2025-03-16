import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./PracticeAreas.css";
import PractiseAreaBg from "./PractiseAreaBg";
import Contact from "../Contact/Contact";
import investmentFranchiseImg from "../../assets/investment.jpg";
import HomeNavLink from "../Navbar/HomeNavLink";
function InvestmentFranchise() {
  return (
    <section className="practise-area">
      <Navbar HomeLinkToRender={HomeNavLink} />
      <PractiseAreaBg title={"Investment & Franchise"} />
      <div className="practise-area-content">
        <div className="main-area">
          <div className="horizontal-bar"></div>
          <h1>Investment & Franchise</h1>
          <div className="main-area-text">
            <h7>
              Our Investment & Franchise Law practice is dedicated to providing
              strategic legal guidance to businesses and individuals involved in
              investment and franchise ventures. We help clients structure,
              negotiate, and execute investment deals, ensuring that their
              interests are protected and aligned with legal and regulatory
              frameworks.
            </h7>
            <h7>
              In investment law, we advise clients on various forms of business
              investments, including private equity, venture capital, and joint
              ventures. In the franchise sector, we provide comprehensive
              support for both franchisors and franchisees. Our services range
              from franchise agreement drafting and review to compliance with
              local and international franchise regulations.
            </h7>
          </div>
          <div className="img-container">
            <img
              src={investmentFranchiseImg}
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
            <h7>Private Equity & Venture Capital</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>{" "}
            <h7>Intellectual Property Protection in Franchising</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Investment Agreements & Structuring</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Investment Due Diligence</h7>
          </div>
          <div className="focus-area">
            <i className="fa fa-caret-right"></i>
            <h7>Arbitration & Mediation in Investment Disputes</h7>
          </div>
        </div>
      </div>
      <Contact />
      <Footer />
    </section>
  );
}

export default InvestmentFranchise;
