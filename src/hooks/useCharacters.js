import { useState, useEffect } from "react";
import { fetchCharacters } from "../services/fetch";

export const useCharacters = (pageNumber, search, status, gender, species) => {
  const [data, setData] = useState({ results: [], info: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacters = async () => {
      setLoading(true);
      try {
        const filters = { search, status, gender, species };
        const data = await fetchCharacters(pageNumber, filters);
        setData(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData({ results: [], info: {} });
      } finally {
        setLoading(false);
      }
    };

    getCharacters();
  }, [pageNumber, search, status, gender, species]);

  return { data, loading, error };
};
