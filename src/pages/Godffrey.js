import React from "react";
import profileImg from "../assets/GM001.jpg";
import ProfilePage from "../components/People/ProfilePage";
const name = "Godfrey Orina";
const position = "Managing Partner";
const about =
  "Godfrey is an Advocate of the High Court of Kenya and the Managing Partner of G.M Orina & Co. Advocates. He specializes in Litigation and Dispute Resolution with a particular focus on Constitutional Law, Commercial Litigation and Tax Law.";

function Godffrey() {
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

export default Godffrey;
