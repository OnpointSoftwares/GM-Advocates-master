import React from "react";
import profileImg from "../assets/Catherine00.jpeg";
import ProfilePage from "../components/People/ProfilePage";
function Anne() {
  const name = "Anne Wanjiru";
  const position = "Adminstrator";
  const about =
    "Anne	is a	proficient professional,	and	has	worked	in	various	sectors.She	holds	a	diploma	in	Information Technology [IT], has worked	with different organizations and companies across the country. She manages and handles the daily business	operations of	the	firm to	 support theday-­‐to-­‐day  activities. Anne joined	G.M	 Orina and Co. Advocates in 2024.";
  return (
    <div>
      <ProfilePage
        profileImg={profileImg}
        name={name}
        about={about}
        position={position}
      />
    </div>
  );
}

export default Anne;
