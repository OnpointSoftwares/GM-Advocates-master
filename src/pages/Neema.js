import React from "react";
import profileImg from "../assets/Neema-Joanne.jpg";
import ProfilePage from "../components/People/ProfilePage";
function Neema() {
  const name = "Neema Joanne";
  const position = "Senior Partner";
  const about =
    "Neema Joanne is an Advocate of the High Court of Kenya and Senior Partner at G.M Orina & Co. Advocates. She holds a Bachelor of Laws Degree from Kisii University, Diploma in Law from Kenya School of Law and is currently pursuing Masters of Law at the University of Nairobi";
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

export default Neema;
