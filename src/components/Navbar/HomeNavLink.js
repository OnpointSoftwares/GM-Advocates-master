import React from "react";
import { Link } from "react-router-dom";
function HomeNavLink() {
  return (
    <Link
      activeClass="active"
      to="/"
      spy={true}
      smooth={true}
      offset={-100}
      duration={600}
      className="desktopMenuListItem"
    >
      Home{" "}
    </Link>
  );
}

export default HomeNavLink;
