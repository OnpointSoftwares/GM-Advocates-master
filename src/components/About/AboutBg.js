import React from "react";
import "./AboutBg.css";
import { Link as ScrollLink } from "react-scroll";
function AboutBg() {
  return (
    <section id="about-bg">
      <div className="horizontal-bar"></div>
      <h1>We Help Solve Your Legal Issues</h1>
      <p>Reach out to us today!</p>

      <ScrollLink
        to="message"
        spy={true}
        smooth={true}
        offset={-100}
        duration={600}
        className="appointmentBtn2"
      >
        {" "}
        <button className="appointmentBtn">Book An Appointment</button>
      </ScrollLink>
    </section>
  );
}

export default AboutBg;
