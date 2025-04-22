import React from "react";
import "./Loading.scss";

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="portal-loader">
        <div className="portal-spinner"></div>
        <div className="loading-text">Loading...</div>
      </div>
    </div>
  );
};

export default Loading;
