import { Link } from "react-router-dom";
import styles from "./Cards.module.scss";

// Extracted status badge component
const StatusBadge = ({ status }) => {
  const badgeColors = {
    Alive: "bg-success",
    Dead: "bg-danger",
    unknown: "bg-secondary",
  };

  const bgColor = badgeColors[status] || "bg-secondary";
  return (
    <div className={`${styles.badge} position-absolute badge ${bgColor}`}>
      {status}
    </div>
  );
};

function Cards({ results, page }) {
  if (!results || results.length === 0) {
    return <div className="text-center">No Characters Found :/</div>;
  }

  return (
    <>
      {results.map((character) => (
        <Link
          key={character.id}
          to={`${page}${character.id}`}
          className="col-4 mb-4 position-relative"
        >
          <div className={`${styles.card}`}>
            <img
              src={character.image}
              alt={character.name}
              className={`${styles.img} img-fluid`}
            />
            <div className="content">
              <div className="fs-4 fw-bold mb-4">{character.name}</div>
              <div className="fs-6">Last location</div>
              <div className="fs-5">{character.location.name}</div>
            </div>
          </div>
          <StatusBadge status={character.status} />
        </Link>
      ))}
    </>
  );
}

export default Cards;
