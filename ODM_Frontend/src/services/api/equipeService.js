import api from "../api";

const URL = "/equipes";

export const getEquipes = async ({ page = 0, size = 10, search = "" }= {}) => {
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

export const getEquipeById = async (id) => {
  const response = await api.get(`${URL}/${id}`);

  return response.data;
};

export const createEquipe = async (data) => {
  const response = await api.post(URL, data);

  return response.data;
};

export const updateEquipe = async (id, data) => {
  const response = await api.put(`${URL}/${id}`, data);

  return response.data;
};

export const deleteEquipe = async (id) => {
  const response = await api.delete(`${URL}/${id}`);

  return response.data;
};
