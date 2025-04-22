import { Link } from "react-router-dom";
import styles from "./Cards.module.scss";
import QuickView from "./QuickView";
import CardSkeleton from "./CardSkeleton";

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

function Cards({ results, page, loading }) {
  // Show skeletons during loading
  if (loading) {
    return <CardSkeleton count={6} />;
  }

  // No results message
  if (!results || results.length === 0) {
    return (
      <div className="text-center py-5 fade-in">
        <img
          src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZnZ6ZHgyN3dvdnBkM3RyMjk2NmdwbXFxbDQzYm9lMHgwNGR3cXhvYiZlcD12MV9pbnRlcm5naWZfYnlfaWQmY3Q9cw/3o7aD2d7hy9ktXNDP2/giphy.gif"
          alt="No characters"
          style={{ maxHeight: "200px" }}
          className="mb-3"
        />
        <h3>No Characters Found :/</h3>
        <p className="text-secondary">Try changing your search or filters</p>
      </div>
    );
  }

  return (
    <>
      {results.map((character, index) => (
        <Link
          key={character.id}
          to={`${page}${character.id}`}
          className={`col-lg-4 col-md-6 mb-4 position-relative fade-in ${styles.cardLink}`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <div className={`${styles.card}`}>
            <div className={styles.imageWrapper}>
              <img
                src={character.image}
                alt={character.name}
                className={`${styles.img}`}
                loading="lazy"
              />
            </div>
            <div className={`${styles.content}`}>
              <div className={`${styles.name}`}>{character.name}</div>
              <div>
                <div className={`${styles.locationLabel}`}>Last location</div>
                <div className={`${styles.location}`}>
                  {character.location.name}
                </div>
              </div>
            </div>

            {/* Quick View Overlay */}
            <QuickView character={character} page={page} />
          </div>
          <StatusBadge status={character.status} />
        </Link>
      ))}
    </>
  );
}

export default Cards;
