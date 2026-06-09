import api from "../api";

const URL = "/motifs";

export const getMotifs = async ({ page = 0, size = 10, search = "" }= {}) => {
  const params = {
    page,
    size,
  };

  if (search?.trim()) {
    params.search = search.trim();
  }

  const response = await api.get(URL, { params });

  return response.data;
};

export const getMotifById = async (id) => {
  const response = await api.get(`${URL}/${id}`);

  return response.data;
};

export const createMotif = async (data) => {
  const response = await api.post(URL, data);

  return response.data;
};

export const updateMotif = async (id, data) => {
  const response = await api.put(`${URL}/${id}`, data);

  return response.data;
};

export const deleteMotif = async (id) => {
  const response = await api.delete(`${URL}/${id}`);

  return response.data;
};
