import styles from "./Filters.module.scss";

function FiltersButton({ task, setPageNumber, name, index, items }) {
  const handleClick = () => {
    task(items);
    setPageNumber(1);
  };

  return (
    <div className={styles.filterButton}>
      <input
        onClick={handleClick}
        className="select"
        type="radio"
        name={name}
        id={`${name}-${index}`}
      />
      <label htmlFor={`${name}-${index}`}>{items}</label>
    </div>
  );
}

export default FiltersButton;
