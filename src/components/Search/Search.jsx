import { useState } from "react";
import styles from "./Search.module.scss";

function Search({ setSearch, setPageNumber }) {
  const [searchText, setSearchText] = useState("");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
    setPageNumber(1);
    setSearch(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
    setPageNumber(1);
    setSearch("");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Just prevent default form submission
  };

  return (
    <div className={`${styles.searchContainer} fade-in`}>
      <div className={styles.searchInputWrapper}>
        <div className={styles.iconWrapper}>
          <i className="fas fa-search"></i>
        </div>

        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            onChange={handleInputChange}
            value={searchText}
            placeholder="Search for characters..."
            type="text"
            className={styles.input}
          />

          <button
            type="button"
            className={`${styles.clearButton} ${
              searchText ? styles.visible : ""
            }`}
            onClick={handleClearSearch}
            aria-label="Clear search"
          >
            <i className="fas fa-times-circle"></i>
          </button>

          <button
            type="submit"
            className={`${styles.searchBtn}`}
            aria-label="Search"
          >
            <i className="fas fa-arrow-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Search;
