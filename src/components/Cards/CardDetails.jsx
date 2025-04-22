import { useParams, useNavigate } from "react-router-dom";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import Loading from "../UI/Loading";
import Error from "../UI/Error";
import styles from "./CardDetails.module.scss";

const StatusBadge = ({ status }) => {
  const badgeColors = {
    Dead: "bg-danger",
    Alive: "bg-success",
    unknown: "bg-secondary",
  };

  const bgColor = badgeColors[status] || "bg-secondary";
  return (
    <div className={`badge ${bgColor} ${styles.statusBadge}`}>{status}</div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className={styles.infoItem}>
    <h3>{label}</h3>
    <p>{value || "Unknown"}</p>
  </div>
);

const CardDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { character, loading, error } = useCharacterDetails(id);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="container py-5">
      <div className={styles.detailContainer}>
        <div className={styles.imageContainer}>
          {/* Add blurred background version of the image */}
          <div
            className={styles.imageBackground}
            style={{ backgroundImage: `url(${character.image})` }}
          ></div>

          <img
            className={styles.image}
            src={character.image}
            alt={character.name}
          />
        </div>

        <div className={styles.content}>
          <h1 className={styles.name}>{character.name}</h1>
          <StatusBadge status={character.status} />

          <div className={styles.infoGrid}>
            <InfoItem label="Species" value={character.species} />
            <InfoItem label="Gender" value={character.gender} />
            <InfoItem label="Origin" value={character.origin?.name} />
            <InfoItem label="Location" value={character.location?.name} />
            <InfoItem label="Type" value={character.type} />
            <InfoItem
              label="Created"
              value={new Date(character.created).toLocaleDateString()}
            />
          </div>

          <button
            onClick={() => navigate(-1)}
            className={`btn btn-primary ${styles.backButton}`}
          >
            &larr; Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
