import api from "../api";

const URL = "/missions";

export const getMissions = async ({ page = 0, size = 10, search = "" } = {}) => {
  const params = {
    page,
    size,
  };

  if (search?.trim()) {
    params.search = search.trim();
  }

  const response = await api.get(`${URL}/all`, { params });

  return response.data;
};

export const getMissionById = async (id) => {
  const response = await api.get(`${URL}/${id}`);

  return response.data;
};

/* export const createMission = async (data) => {
  const response = await api.post(URL, data);

  return response.data;
};

export const updateMission = async (id, data) => {
  const response = await api.put(`${URL}/${id}`, data);

  return response.data;
}; */

export const deleteMission = async (id) => {
  const response = await api.delete(`${URL}/${id}`);

  return response.data;
};

/* export const validateMission = async (id, data) => {
  const response = await api.put(`${URL}/${id}/validate`, data);
  return response.data;
};

export const processMission = async (id, data) => {
  const response = await api.put(`${URL}/${id}/process`, data);
  return response.data;
}; */

export const getMyMissions = async ({ page = 0, size = 10, search = "" }) => {

  const params = {
    page,
    size,
  };

  if (search?.trim()) {
    params.search = search.trim();
  }

  const response = await api.get(`${URL}/myMissions`, {params,
  });

  return response.data;
};

export const missionApi = {
  create: (data) => api.post(URL, data),
  update: (id, data) => api.put(`${URL}/${id}`, data),
  validate: (id, data) => api.put(`${URL}/${id}/validate`, data),
  process: (id, data) => api.put(`${URL}/${id}/process`, data),
};
