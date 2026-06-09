import axios from "axios";
import { API_URL } from "./api";

const API = `${API_URL}/auth`;

export const loginRequest = (data) => {
  return axios.post(`${API}/login`, data, {
    withCredentials: true
  });
};

export const refreshRequest = () => {
  return axios.post(`${API}/refresh`, {}, {
    withCredentials: true
  });
};

export const logoutRequest = () => {
  return axios.post(`${API}/logout`, {}, {
    withCredentials: true
  });
};

