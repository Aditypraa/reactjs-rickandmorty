import { useState } from "react";
import Cards from "../components/Cards/Cards";
import InputGroup from "../components/Filters/Category/InputGroup";
import { useEpisode, useEpisodeCount } from "../hooks/useEpisode";
import Error from "../components/UI/Error";
import styles from "./Episodes.module.scss";

function Episodes() {
  const [id, setId] = useState(1);
  const { total } = useEpisodeCount();
  const { info, characters, loading, error } = useEpisode(id);

  const formatEpisodeCode = (code) => {
    if (!code) return "Unknown";
    const season = code.slice(1, 3);
    const episode = code.slice(4);
    return `S${season}E${episode}`;
  };

  return (
    <div className="container fade-in">
      {loading ? (
        <div className={styles.episodeHeaderSkeleton}>
          <div className={styles.episodeNameSkeleton}></div>
          <div className={styles.episodeAirDateSkeleton}></div>
        </div>
      ) : error ? (
        <Error message={error} />
      ) : (
        <div className={styles.episodeHeader}>
          <div className={`${styles.badge} float`}>
            <i className="fas fa-tv"></i> {formatEpisodeCode(info.episode)}
          </div>
          <h1>
            Episode:{" "}
            <span className={styles.episodeName}>{info.name || "Unknown"}</span>
          </h1>
          <h5>
            Air Date:{" "}
            <span className="text-accent">{info.air_date || "Unknown"}</span>
          </h5>
        </div>
      )}

      <div className={styles.episodesContent}>
        <div className={styles.filterColumn}>
          <h4 className={styles.pickerTitle}>Pick an Episode</h4>
          <div className={styles.selectGroup}>
            <InputGroup
              setId={setId}
              name={"Episode"}
              total={total}
              customClass={styles.select}
            />
          </div>
        </div>

        <div className={styles.episodeGrid}>
          <div className="row">
            {error ? (
              <Error message={error} />
            ) : (
              <Cards page="/episodes/" results={characters} loading={loading} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Episodes;
