import { useState, useEffect } from "react";
import {
  fetchLocation,
  fetchLocationCount,
  fetchMultipleCharacters,
} from "../services/fetch";

export const useLocationCount = () => {
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCount = async () => {
      try {
        const count = await fetchLocationCount();
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

export const useLocation = (id) => {
  const [info, setInfo] = useState({});
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocationData = async () => {
      setLoading(true);
      try {
        const data = await fetchLocation(id);
        setInfo(data);
        setError(null);

        // Fetch residents from location
        const chars = await fetchMultipleCharacters(data.residents);
        setResidents(chars);
      } catch (err) {
        setError(err.message);
        setInfo({});
        setResidents([]);
      } finally {
        setLoading(false);
      }
    };

    getLocationData();
  }, [id]);

  return { info, residents, loading, error };
};
