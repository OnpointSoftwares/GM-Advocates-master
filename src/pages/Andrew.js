import React from "react";
import profileImg from "../assets/andrew.jpeg";
import ProfilePage from "../components/People/ProfilePage";
function Andrew() {
  const name = "Andrew Wanga";
  const position = "Senior Partner";
  const about =
    " Andrew is a senior partner at G.M Orina & Co. Advocates. He specializes in Commercial Law, Real Estate Law and Financial Technology.";
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

export default Andrew;
