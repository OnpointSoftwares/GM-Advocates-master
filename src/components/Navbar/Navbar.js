import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.jpeg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";

const Navbar = ({ HomeLinkToRender }) => {
  const [showMenu, setshowMenu] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <div className="navbar">
      <motion.div
        initial={{ x: "-30vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", duration: 4 }}
        className="name-logo"
      >
        <img src={logo} alt="Logo" className="logo" />
        <h>
          <bold>G.M ORINA & CO. ADVOCATES</bold>
        </h>
      </motion.div>

      <motion.div
        initial={{ y: "-30vh" }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 4 }}
        className="desktopMenu"
      >
        {HomeLinkToRender && <HomeLinkToRender />}
        <ScrollLink
          activeClass="active"
          to="about"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="desktopMenuListItem"
        >
          About
        </ScrollLink>

        <ScrollLink
          activeClass="active"
          to="practice-areas"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="desktopMenuListItem"
        >
          Practice Areas
        </ScrollLink>

        <Link
          activeClass="active"
          to="/our-people/"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="desktopMenuListItem"
        >
          Our People
        </Link>
        <Link
          activeClass="active"
          to="/articles/"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="desktopMenuListItem"
        >
          Articles
        </Link>
        <Link
          activeClass="active"
          to="/careers/"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="desktopMenuListItem"
        >
          Careers
        </Link>
        <ScrollLink
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="desktopMenuListItem"
        >
          Contact Us
        </ScrollLink>
      </motion.div>

      <div className="mobMenu" onClick={() => setshowMenu(!showMenu)}>
        {showMenu ? (
          <i className="bi bi-x-lg"></i>
        ) : (
          <i className="bi bi-list"></i>
        )}
      </div>

      <div className="navMenu" style={{ display: showMenu ? "flex" : "none" }}>
        <Link
          activeClass="active"
          to="/"
          spy={true}
          smooth={true}
          offset={-100}
          duration={600}
          className="listItem"
          onClick={() => setshowMenu(false)}
        >
          Home{" "}
        </Link>
        <ScrollLink
          activeClass="active"
          to="about"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="listItem"
          onClick={() => setshowMenu(false)}
        >
          About
        </ScrollLink>

        <ScrollLink
          activeClass="active"
          to="practice-areas"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="listItem"
          onClick={() => setshowMenu(false)}
        >
          Practice Areas
        </ScrollLink>

        <Link
          activeClass="active"
          to="/our-people/"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="listItem"
          onClick={() => setshowMenu(false)}
        >
          Our People
        </Link>
        <Link
          activeClass="active"
          to="/articles/"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="listItem"
          onClick={() => setshowMenu(false)}
        >
          Articles
        </Link>
        <Link
          activeClass="active"
          to="/careers/"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="listItem"
          onClick={() => setshowMenu(false)}
        >
          Careers
        </Link>

        <ScrollLink
          activeClass="active"
          to="contact"
          spy={true}
          smooth={true}
          offset={-50}
          duration={600}
          className="listItem"
          style={{
            display: "block",
            color: "#024677",
            padding: "0.25rem 0",
            width: "fit-content",
          }}
          onClick={() => setshowMenu(false)}
        >
          Contact us
        </ScrollLink>

        <button className="ConsultationBtn">Get in Touch</button>
      </div>
    </div>
  );
};

export default Navbar;
