import api from "../api";

const URL = "/users";

export const getUsers = async (params) => {
  const response = await api.get(URL, {
    params,
  });

  return response.data;
};

export const getUserById = async (id) => {
  const response = await api.get(`${URL}/${id}`);

  return response.data;
};

export const updateUserByOwner = async (id, data) => {
  const response = await api.put(`${URL}/${id}`, data);

  return response.data;
};

export const updateUserByAdmin = async (id, data) => {
  const response = await api.put(`${URL}/${id}/admin`, data);

  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`${URL}/${id}`);

  return response.data;
};


// inscription
const URL_REGISTER = "/auth";
export const registerUser = async (data) => {
  const response = await api.post(`${URL_REGISTER}/register`, data);

  return response.data;
};
