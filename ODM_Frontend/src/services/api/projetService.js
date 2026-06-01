import api from "../api";

const URL = "/projets";

export const getProjets = async (params) => {
  const response = await api.get(URL, {
    params,
  });

  return response.data;
};

export const getProjetById = async (id) => {
  const response = await api.get(`${URL}/${id}`);

  return response.data;
};

export const createProjet = async (data) => {
  const response = await api.post(URL, data);

  return response.data;
};

export const updateProjet = async (id, data) => {
  const response = await api.put(`${URL}/${id}`, data);

  return response.data;
};

export const deleteProjet = async (id) => {
  const response = await api.delete(`${URL}/${id}`);

  return response.data;
};

export const getMyEquipeProjects = async () => {
  const response = await api.get(`${URL}/equipe`);

  return response.data;
};