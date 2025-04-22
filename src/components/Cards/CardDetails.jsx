import { useParams } from "react-router-dom";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

const StatusBadge = ({ status }) => {
  const badgeColors = {
    Dead: "bg-danger",
    Alive: "bg-success",
    unknown: "bg-secondary",
  };

  const bgColor = badgeColors[status] || "bg-secondary";
  return <div className={`badge ${bgColor} fs-5`}>{status}</div>;
};

const CharacterInfo = ({ label, value }) => (
  <div>
    <span className="fw-bold">{label}: </span>
    {value}
  </div>
);

const CardDetails = () => {
  const { id } = useParams();
  const { character, loading, error } = useCharacterDetails(id);

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="container d-flex justify-content-center mb-5">
      <div className="d-flex flex-column gap-3">
        <h1 className="text-center">{character.name}</h1>
        <img className="img-fluid" src={character.image} alt={character.name} />
        <StatusBadge status={character.status} />
        <div className="content">
          <CharacterInfo label="Gender" value={character.gender} />
          <CharacterInfo label="Location" value={character.location?.name} />
          <CharacterInfo label="Origin" value={character.origin?.name} />
          <CharacterInfo label="Species" value={character.species} />
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
