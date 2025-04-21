import { useState, useEffect } from "react";
import { fetchSingleCharacter } from "../services/fetch";

export const useCharacterDetails = (id) => {
  const [character, setCharacter] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCharacter = async () => {
      setLoading(true);
      try {
        const data = await fetchSingleCharacter(id);
        setCharacter(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setCharacter({});
      } finally {
        setLoading(false);
      }
    };

    getCharacter();
  }, [id]);

  return { character, loading, error };
};
