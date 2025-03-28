import React, { useEffect } from "react";
import "./Home.css";
import sliderImage from "../../assets/slide1.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import logo from "../../assets/logo.jpeg";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import corevalueImg from "../../assets/core-value.jpeg";
import { Link as ScrollLink } from "react-scroll";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  };

  return (
    <>
      <section id="home" className="home">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          navigation
          pagination={{ clickable: true, dynamicBullets: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          loop={true}
        >
          <SwiperSlide>
            <div className="slide">
              <motion.div
                variants={fadeIn("left", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
              >
                <img
                  className="slideimg"
                  src={sliderImage}
                  alt="Legal Excellence"
                />
              </motion.div>
              <div className="slidecontent">
                <motion.h
                  variants={fadeIn("right", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                >
                  Count on us for reliable legal support. Our goal is to achieve
                  favorable outcomes for all our clients.
                </motion.h>

                <motion.button
                  variants={fadeIn("up", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                  className="slideBtn"
                >
                  <ScrollLink
                    to="message"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={600}
                  >
                    Get In Touch
                  </ScrollLink>
                </motion.button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <motion.div
                variants={fadeIn("left", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
              >
                <img 
                  className="slideimg" 
                  src={logo} 
                  alt="GM Orina & Co. Advocates"
                />
              </motion.div>
              <div className="slidecontent">
                <motion.h
                  variants={fadeIn("right", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                >
                  Step into a world of legal excellence with G.M ORINA & CO.
                  ADVOCATES. We stand as your trusted partner in navigating the
                  legal landscape.
                </motion.h>
                <motion.button
                  variants={fadeIn("up", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                  className="slideBtn"
                >
                  <ScrollLink
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={600}
                  >
                    Contact Us
                  </ScrollLink>
                </motion.button>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="slide">
              <motion.div
                className="valueimg"
                variants={fadeIn("left", 0.3)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: false, amount: 0.7 }}
              >
                <img
                  className="slideimg"
                  src={corevalueImg}
                  alt="Our Core Values"
                />
              </motion.div>
              <div className="slidecontent">
                <motion.div
                  variants={fadeIn("right", 0.3)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                >
                  <div className="value-item">
                    <i className="bi bi-patch-check-fill"></i>
                    <h>Effectiveness</h>
                    <p>
                      We recognize that our client's concerns are crucial. We
                      are quick to respond to their concerns and act upon them
                      promptly.
                    </p>
                  </div>
                  <div className="value-item">
                    <i className="bi bi-award-fill"></i>
                    <h>Performance Excellence</h>
                    <p>
                      We are responsible professionals. We strive to meet and
                      even exceed Client expectations.
                    </p>
                  </div>
                  <div className="value-item">
                    <i className="bi bi-shield-fill-check"></i>
                    <h>Integrity</h>
                    <p>
                      We recognize that long-lasting and successful business
                      relationships are built on integrity, which is one of our
                      core values.
                    </p>
                  </div>
                </motion.div>
                <motion.button
                  variants={fadeIn("up", 0.4)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: false, amount: 0.7 }}
                  className="slideBtn"
                >
                  <ScrollLink
                    to="contact"
                    spy={true}
                    smooth={true}
                    offset={-100}
                    duration={600}
                  >
                    Contact Us
                  </ScrollLink>
                </motion.button>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>
    </>
  );
}

export default Home;
