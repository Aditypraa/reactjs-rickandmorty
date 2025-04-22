import React from "react";
import "./Error.scss";

const Error = ({
  message = "Something went wrong. Please try again later.",
}) => {
  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-icon">
          <i className="fas fa-exclamation-triangle"></i>
        </div>
        <h3 className="error-title">Oops!</h3>
        <p className="error-message">{message}</p>
        <button
          className="btn btn-primary error-button"
          onClick={() => window.location.reload()}
        >
          <i className="fas fa-sync-alt"></i> Try Again
        </button>
      </div>
    </div>
  );
};

export default Error;
