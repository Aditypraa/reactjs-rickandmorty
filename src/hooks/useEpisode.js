import { useState, useEffect } from "react";
import {
  fetchEpisode,
  fetchEpisodeCount,
  fetchMultipleCharacters,
} from "../services/fetch";

export const useEpisodeCount = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCount = async () => {
      try {
        const count = await fetchEpisodeCount();
        setTotal(count);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCount();
  }, []);

  return { total, loading, error };
};

export const useEpisode = (id) => {
  const [info, setInfo] = useState({});
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getEpisodeData = async () => {
      setLoading(true);
      try {
        const data = await fetchEpisode(id);
        setInfo(data);
        setError(null);

        // Fetch characters from episode
        const chars = await fetchMultipleCharacters(data.characters);
        setCharacters(chars);
      } catch (err) {
        setError(err.message);
        setInfo({});
        setCharacters([]);
      } finally {
        setLoading(false);
      }
    };

    getEpisodeData();
  }, [id]);

  return { info, characters, loading, error };
};
