import { useEffect, useState } from "react";
import { searchLocation } from "./searchLocation";

export const useLocationSearch = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = setTimeout(async () => {
      if (!query || query.length < 3) {
        setResults([]);
        return;
      }

      setLoading(true);

      try {
        const data = await searchLocation(query);
        setResults(data || []);
      } catch (err) {
        console.error(err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce

    return () => clearTimeout(handler);
  }, [query]);

  return { results, loading };
};
