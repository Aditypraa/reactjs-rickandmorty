import React from "react";
import "./ActiveFilters.scss";

const ActiveFilters = ({ status, gender, species, clearFilter }) => {
  const hasActiveFilters = status || gender || species;

  const handleRemove = (type) => {
    clearFilter(type);
  };

  if (!hasActiveFilters) {
    return null;
  }

  return (
    <div className="activeFiltersContainer fade-in">
      <div className="d-flex align-items-center">
        <i className="fas fa-filter me-2 text-primary"></i>
        <h6 className="mb-0">Active Filters:</h6>
      </div>

      <div className="activeFiltersList">
        {status && (
          <div className="activeFilterTag">
            <span>
              <span className="filterType">Status:</span> {status}
            </span>
            <button
              className="removeBtn"
              onClick={() => handleRemove("status")}
              title="Remove status filter"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {species && (
          <div className="activeFilterTag">
            <span>
              <span className="filterType">Species:</span> {species}
            </span>
            <button
              className="removeBtn"
              onClick={() => handleRemove("species")}
              title="Remove species filter"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}

        {gender && (
          <div className="activeFilterTag">
            <span>
              <span className="filterType">Gender:</span> {gender}
            </span>
            <button
              className="removeBtn"
              onClick={() => handleRemove("gender")}
              title="Remove gender filter"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveFilters;
