import { useState } from "react";
import Cards from "../components/Cards/Cards";
import InputGroup from "../components/Filters/Category/InputGroup";
import { useLocation, useLocationCount } from "../hooks/useLocation";
import Loading from "../components/UI/Loading";
import Error from "../components/UI/Error";
import styles from "./Locations.module.scss";

function Location() {
  const [id, setId] = useState(1);
  const { total } = useLocationCount();
  const { info, residents, loading, error } = useLocation(id);

  return (
    <div className="container fade-in">
      {loading ? (
        <div className={styles.locationHeaderSkeleton}>
          <div className={styles.locationNameSkeleton}></div>
          <div className={styles.locationInfoSkeleton}>
            <div className={styles.infoItemSkeleton}></div>
            <div className={styles.infoItemSkeleton}></div>
            <div className={styles.infoItemSkeleton}></div>
          </div>
        </div>
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className={styles.locationHeader}>
          <div className={`${styles.residentCountBadge} float`}>
            <i className="fas fa-user-astronaut"></i> {residents.length}{" "}
            Residents
          </div>
          <h1>
            Location:{" "}
            <span className={styles.locationName}>
              {info.name || "Unknown"}
            </span>
          </h1>
          <div className={styles.locationInfo}>
            <div className={styles.infoItem}>
              <h6>TYPE</h6>
              <p>{info.type || "Unknown"}</p>
            </div>
            <div className={styles.infoItem}>
              <h6>DIMENSION</h6>
              <p>{info.dimension || "Unknown"}</p>
            </div>
            <div className={styles.infoItem}>
              <h6>CREATED</h6>
              <p>{new Date(info.created).toLocaleDateString() || "Unknown"}</p>
            </div>
          </div>
        </div>
      )}

      <div className={styles.locationsContent}>
        <div className={styles.filterColumn}>
          <h4 className={styles.pickerTitle}>Pick a Location</h4>
          <div className={styles.selectGroup}>
            <InputGroup
              setId={setId}
              name={"Location"}
              total={total}
              customClass={styles.select}
            />
          </div>
        </div>

        <div className={styles.locationGrid}>
          <div className="row">
            {error ? (
              <Error message={error} />
            ) : (
              <Cards page="/locations/" results={residents} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Location;
