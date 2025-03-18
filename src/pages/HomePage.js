import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Home from "../components/Home/Home";
import Footer from "../components/Footer/Footer";
import AboutBg from "../components/About/AboutBg";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Review from "../components/Review/Review";
import Message from "../components/Message/Message";
import HomeScrollLink from "../components/Navbar/HomeScrollLink";


function HomePage() {
  return (
    <div className="Homepage">
      <Navbar HomeLinkToRender={HomeScrollLink} />
      <Home />
      <About />
      <AboutBg />
      <Review />
      <Message />
      <Contact />
      <Footer />
    </div>
  );
}

export default HomePage;
