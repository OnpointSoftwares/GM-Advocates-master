import React from "react";
import { Link as ScrollLink } from "react-scroll";
function HomeScrollLink() {
  return (
    <ScrollLink
      activeClass="active"
      to="home"
      spy={true}
      smooth={true}
      offset={-50}
      duration={600}
      className="desktopMenuListItem"
    >
      Home
    </ScrollLink>
  );
}

export default HomeScrollLink;
