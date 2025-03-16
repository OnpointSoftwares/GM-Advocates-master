import React, { useEffect } from "react";
import "./Contact.css";
function Contact() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section id="contact">
      <h3>Don't Wait Any Longer</h3>
      <h1>Contact Us Today!</h1>

      <div className="phone">
        <i className="fa fa-phone"></i>
        <h2>+254 786 437 754</h2>
      </div>
    </section>
  );
}

export default Contact;
