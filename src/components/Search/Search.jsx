import { useState } from "react";
import styles from "./Search.module.scss";

function Search({ setSearch, setPageNumber }) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setPageNumber(1);
    setSearch(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <form className="d-flex justify-content-center gap-4 mb-5">
      <input
        onChange={handleInputChange}
        value={searchText}
        placeholder="Search for Characters"
        type="text"
        className={`${styles.input}`}
      />
      <button
        onClick={handleSearch}
        className={`${styles.btn} btn btn-primary fs-5`}
      >
        Search
      </button>
    </form>
  );
}

export default Search;
