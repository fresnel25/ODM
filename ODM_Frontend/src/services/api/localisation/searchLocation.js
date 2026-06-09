import api from "../../api";

export const searchLocation = async (query) => {
  if (!query || query.length < 3) return [];

  const res = await api.get("/geo/search", {
    params: { q: query },
  });

  return res.data;
};