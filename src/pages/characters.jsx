import { useState, useEffect } from "react";
import Filters from "../components/Filters/Filters";
import ActiveFilters from "../components/Filters/ActiveFilters";
import Cards from "../components/Cards/Cards";
import Pagination from "../components/Pagination/Pagination";
import Search from "../components/Search/Search";
import { useCharacters } from "../hooks/useCharacters";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";
import "./Characters.scss";

const Characters = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [gender, setGender] = useState("");
  const [species, setSpecies] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [showFilters, setShowFilters] = useState(false);

  // Track window size for responsive features
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { data, loading, error } = useCharacters(
    pageNumber,
    search,
    status,
    gender,
    species
  );

  const { info, results } = data;

  const clearFilter = (type) => {
    switch (type) {
      case "status":
        setStatus("");
        break;
      case "species":
        setSpecies("");
        break;
      case "gender":
        setGender("");
        break;
      default:
        break;
    }
    setPageNumber(1);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="characters-page">
      <div className="container">
        <div className="header-section fade-in">
          <h1 className="section-title">Characters</h1>
          <div className="stats-banner">
            {!loading && !error && info && (
              <>
                <div className="stat-item">
                  <i className="fas fa-users"></i>
                  <span>Total Characters</span>
                  <strong>{info.count}</strong>
                </div>
                <div className="stat-item">
                  <i className="fas fa-globe"></i>
                  <span>Pages</span>
                  <strong>{info.pages}</strong>
                </div>
                <div className="stat-item">
                  <i className="fas fa-filter"></i>
                  <span>Current Filters</span>
                  <strong>
                    {status || gender || species ? "Active" : "None"}
                  </strong>
                </div>
              </>
            )}
          </div>
        </div>

        <Search setPageNumber={setPageNumber} setSearch={setSearch} />

        <ActiveFilters
          status={status}
          gender={gender}
          species={species}
          clearFilter={clearFilter}
        />

        {/* Mobile toggle for filters */}
        {windowWidth < 992 && (
          <button
            className="btn btn-outline-primary d-lg-none w-100 mb-3 filters-toggle"
            onClick={toggleFilters}
          >
            <i
              className={`fas fa-${showFilters ? "times" : "filter"} me-2`}
            ></i>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        )}

        <div className="content-section">
          {/* Filters column - always present on large screens */}
          {(windowWidth >= 992 || showFilters) && (
            <div className="filters-column">
              <Filters
                setStatus={setStatus}
                setGender={setGender}
                setSpecies={setSpecies}
                setPageNumber={setPageNumber}
              />
            </div>
          )}

          {/* Cards grid - takes full width when filters are hidden on mobile */}
          <div className="characters-grid">
            <div className="row">
              {error ? (
                <Error message={error} />
              ) : (
                <Cards page="/" results={results} loading={loading} />
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
