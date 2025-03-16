import "./Footer.css";
import { Link } from "react-scroll";
import Twitter from "../../assets/twitter.png";
import Facebook from "../../assets/facebook-icon.png";
import Instagram from "../../assets/instagram.png";
import Youtube from "../../assets/youtube.png";
function Footer() {
  return (
    <section id="footer">
      <div className="footerContent">
        <h1 className="footerText">
          We are Committed to exceeding your expectations. Get the legal
          representation you deserve.{" "}
        </h1>
        <div className="contact-address">
          <h1>Contact us</h1>
          <div className="contact-item">
            <i class="bi bi-geo-alt-fill"></i>
            <h4>
              Krishna Centre, 7th Floor, Suite 712
              <br /> Woodvale Groove, Westlands
            </h4>
          </div>
          <div className="contact-item">
            <i class="bi bi-envelope-open-fill"></i>
            <h4>P.O Box 33499-00600, Nairobi.</h4>{" "}
          </div>

          <div className="contact-item">
            <i class="bi bi-telephone-fill"></i> <h4>+254 786 437 754</h4>{" "}
          </div>

          <div className="contact-item">
            <i className="bi bi-envelope-fill"></i>
            <h4> info@gmorinaadvocates.com</h4>{" "}
          </div>
        </div>
      </div>
      <div className="socials">
        <h4>Copyright &#169; 2024 G.M Orina & Co. Advocates </h4>

        <div className="links">
          <Link>
            {" "}
            <img src={Facebook} alt="Facebook-logo" className="link"></img>{" "}
          </Link>
          <Link>
            {" "}
            <img src={Twitter} alt="Twitter-logo" className="link"></img>{" "}
          </Link>
          <Link>
            {" "}
            <img src={Youtube} alt="Youtube-logo" className="link"></img>{" "}
          </Link>
          <Link>
            {" "}
            <img
              src={Instagram}
              alt="Instagram-logo"
              className="link"
            ></img>{" "}
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Footer;
