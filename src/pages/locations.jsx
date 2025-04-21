import { useState } from "react";
import Cards from "../components/Cards/Cards";
import InputGroup from "../components/Filters/Category/InputGroup";
import { useLocation, useLocationCount } from "../hooks/useLocation";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

function Location() {
  const [id, setId] = useState(1);
  const { total } = useLocationCount();
  const { info, residents, loading, error } = useLocation(id);

  const { name, type, dimension } = info;

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center mb-4">
          Location :{" "}
          <span className="text-primary">
            {loading ? "Loading..." : error ? "Error" : name || "Unknown"}
          </span>
        </h1>
        <h5 className="text-center">
          Dimension :{" "}
          {loading ? "Loading..." : error ? "Error" : dimension || "Unknown"}
        </h5>
        <h5 className="text-center">
          Type : {loading ? "Loading..." : error ? "Error" : type || "Unknown"}
        </h5>
      </div>
      <div className="row">
        <div className="col-3">
          <h4 className="text-center mb-4">Pick Location</h4>
          <InputGroup setId={setId} name={"Location"} total={total} />
        </div>
        <div className="col-8">
          <div className="row">
            {loading ? (
              <Loading />
            ) : error ? (
              <Error message={error} />
            ) : (
              <Cards page="/locations/" results={residents} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
