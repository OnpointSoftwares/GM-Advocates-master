import React from "react";
import "./About.css";
import aboutImg from "../../assets/advance-materials.jpg";
import { fadeIn } from "../../variants";
import { motion } from "framer-motion";
function About() {
  return (
    <section id="about">
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="about-img-div"
      >
        <img src={aboutImg} className="about-img" alt="about-img" />
      </motion.div>
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: false, amount: 0.7 }}
        className="about-content"
      >
        <h1>
          Your trusted Legal <br />
          Partner
        </h1>
      

        <p>
          G.M Orina & Co. Advocates is a premierlaw firm providing legal
          counsel and solutions to a wide range of clients in Kenya, Africa and
          globally.
        </p>
      </motion.div>
    </section>
  );
}

export default About;
