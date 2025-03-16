import { React } from "react";
import { Link } from "react-router-dom";

import "./PersonCard.css";

const PersonCard = ({
  profilePic,
  firstName,
  lastName,
  position,
  profileLink,
}) => {
  return (
    <div className="card">
      <img className="profile-pic" src={profilePic} alt="Profile" />

      <div className="info">
        <h2 className="person-name">
          {firstName} {lastName}
        </h2>
        <p className="position">{position}</p>
        <Link to={profileLink} state={{ smooth: true }} className="view-more">
          View More
        </Link>
      </div>
    </div>
  );
};

export default PersonCard;
