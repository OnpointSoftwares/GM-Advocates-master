import React from "react";
import "./JobDetailBg.css";
function JobDetailBg({ name, location, type }) {
  return (
    <div className="bg">
      <h className="type">{type}</h>
      <h className="job-name"> {name}</h>
      <h className="location">{location}</h>
    </div>
  );
}

export default JobDetailBg;
