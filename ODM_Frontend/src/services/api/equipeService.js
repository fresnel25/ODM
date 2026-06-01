import api from "../api";

const URL = "/equipes";

export const getEquipes = async (params) => {
  const response = await api.get(URL, {
    params,
  });

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