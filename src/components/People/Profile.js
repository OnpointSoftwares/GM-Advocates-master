import React from "react";
import "./Profile.css";
const Profile = ({ profileImg, name, about, position }) => {
  return (
    <section id="profile">
      <div className="profile-img-div">
        <img src={profileImg} className="profile-img" alt="profile-img" />
      </div>
      <div className="profile-content">
        <h1>{name}</h1>
        <p className="position">{position}</p>
        <p className="about">{about}</p>
      </div>
    </section>
  );
};

export default Profile;
