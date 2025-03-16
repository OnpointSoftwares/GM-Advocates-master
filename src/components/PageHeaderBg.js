import React from "react";
import "./PageHeaderBg.css";

function PageHeaderBg({ title }) {
  return (
    <div className="page-header-bg">
      <h1>{title}</h1>
    </div>
  );
}

export default PageHeaderBg;
