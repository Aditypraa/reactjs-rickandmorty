import React from "react";
import "./CardSkeleton.scss";

const CardSkeleton = ({ count = 6 }) => {
  return Array(count)
    .fill(0)
    .map((_, index) => (
      <div className="col-lg-4 col-md-6 mb-4 position-relative" key={index}>
        <div className="skeleton-card">
          <div className="skeleton-img"></div>
          <div className="skeleton-content">
            <div className="skeleton-name"></div>
            <div>
              <div className="skeleton-location-label"></div>
              <div className="skeleton-location"></div>
            </div>
          </div>
        </div>
        <div className="skeleton-status"></div>
      </div>
    ));
};

export default CardSkeleton;
