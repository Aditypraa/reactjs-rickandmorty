import Gender from "./Category/Gender";
import Species from "./Category/Species";
import Status from "./Category/Status";
import styles from "./Filters.module.scss";

export default function Filters({
  setStatus,
  setGender,
  setSpecies,
  setPageNumber,
}) {
  let clear = () => {
    setStatus("");
    setGender("");
    setSpecies("");
    setPageNumber("");
    window.location.reload(false);
  };

  return (
    <div className={`${styles.filtersContainer} fade-in`}>
      <h2 className={styles.filterTitle}>Filters</h2>
      <span onClick={clear} className={styles.clearFilters}>
        Clear All Filters
      </span>

      <div className={`accordion ${styles.accordion}`} id="accordionExample">
        <Status setStatus={setStatus} setPageNumber={setPageNumber} />
        <Species setSpecies={setSpecies} setPageNumber={setPageNumber} />
        <Gender setGender={setGender} setPageNumber={setPageNumber} />
      </div>
    </div>
  );
}
