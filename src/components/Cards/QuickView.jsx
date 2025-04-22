import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuickView.scss";

const QuickView = ({ character, page }) => {
  const navigate = useNavigate();

  const viewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`${page}${character.id}`);
  };

  const viewEpisodes = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // Get first episode ID from URL
    const episodeId =
      character.episode && character.episode[0]
        ? character.episode[0].split("/").pop()
        : null;

    if (episodeId) {
      navigate(`/episodes/${episodeId}`);
    }
  };

  return (
    <div className="quickViewOverlay">
      <button className="quickViewButton" onClick={viewDetails}>
        <i className="fas fa-info-circle"></i> View Details
      </button>

      {character.episode && character.episode.length > 0 && (
        <button
          className="quickViewButton episodeButton"
          onClick={viewEpisodes}
        >
          <i className="fas fa-tv"></i> First Episode
        </button>
      )}

      <div className="quickViewInfo">
        <span className="infoLabel">Species</span>
        <span>{character.species || "Unknown"}</span>
      </div>
    </div>
  );
};

export default QuickView;
