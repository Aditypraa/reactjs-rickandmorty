import { useState } from "react";
import Filters from "../components/Filters/Filters";
import Cards from "../components/Cards/Cards";
import Pagination from "../components/Pagination/Pagination";
import Search from "../components/Search/Search";
import { useCharacters } from "../hooks/useCharacters";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";

const Characters = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");

  const { data, loading, error } = useCharacters(
    pageNumber,
    search,
    status,
    gender,
    species
  );

  const { info, results } = data;

  return (
    <div className="App">
      <h1 className="text-center mb-4">Character</h1>
      <Search setPageNumber={setPageNumber} setSearch={setSearch} />

      <div className="container">
        <div className="row">
          <Filters
            setStatus={setStatus}
            setGender={setGender}
            setSpecies={setSpecies}
            setPageNumber={setPageNumber}
          />
          <div className="col-8">
            <div className="row">
              {loading ? (
                <Loading />
              ) : error ? (
                <Error message={error} />
              ) : (
                <Cards page="/" results={results} />
              )}
            </div>
          </div>
        </div>
      </div>

      {info?.pages && !error && (
        <Pagination
          info={info}
          pageNumber={pageNumber}
          setPageNumber={setPageNumber}
        />
      )}
    </div>
  );
};

export default Characters;
