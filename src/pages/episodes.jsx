import { useState } from "react";
import Cards from "../components/Cards/Cards";
import InputGroup from "../components/Filters/Category/InputGroup";
import { useEpisode, useEpisodeCount } from "../hooks/useEpisode";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

function Episodes() {
  const [id, setId] = useState(1);
  const { total } = useEpisodeCount();
  const { info, characters, loading, error } = useEpisode(id);

  const { name, air_date } = info;

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center mb-4">
          Episodes :{" "}
          <span className="text-primary">
            {loading ? "Loading..." : error ? "Error" : name || "Unknown"}
          </span>
        </h1>
        <h5 className="text-center">
          Air Date :{" "}
          {loading ? "Loading..." : error ? "Error" : air_date || "Unknown"}
        </h5>
      </div>
      <div className="row">
        <div className="col-3">
          <h4 className="text-center mb-4">Pick Episodes</h4>
          <InputGroup setId={setId} name={"Episode"} total={total} />
        </div>
        <div className="col-8">
          <div className="row">
            {loading ? (
              <Loading />
            ) : error ? (
              <Error message={error} />
            ) : (
              <Cards page="/episodes/" results={characters} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Episodes;
