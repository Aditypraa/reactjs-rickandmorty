import { useParams } from "react-router-dom";
import { useCharacterDetails } from "../../hooks/useCharacterDetails";
import Loading from "../UI/Loading";
import Error from "../UI/Error";

const CardDetails = () => {
  const { id } = useParams();
  const { character, loading, error } = useCharacterDetails(id);

  const renderStatus = () => {
    if (loading) return null;
    if (error) return null;

    if (character.status === "Dead") {
      return <div className="badge bg-danger fs-5">{character.status}</div>;
    } else if (character.status === "Alive") {
      return <div className="badge bg-success fs-5">{character.status}</div>;
    } else {
      return <div className="badge bg-secondary fs-5">{character.status}</div>;
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="container d-flex justify-content-center mb-5">
      <div className="d-flex flex-column gap-3">
        <h1 className="text-center">{character.name}</h1>
        <img className="img-fluid" src={character.image} alt={character.name} />
        {renderStatus()}
        <div className="content">
          <div className="">
            <span className="fw-bold">Gender: </span>
            {character.gender}
          </div>
          <div className="">
            <span className="fw-bold">Location: </span>
            {character.location?.name}
          </div>
          <div className="">
            <span className="fw-bold">Origin: </span>
            {character.origin?.name}
          </div>
          <div className="">
            <span className="fw-bold">Species: </span>
            {character.species}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
