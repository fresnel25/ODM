import api from "../api";

const URL = "/settings";

export const settingApi = {
  get: () => api.get(URL),
  save: (data) => api.put(URL, data),
  uploadLogo: (data) =>
  api.post(`${URL}/logo`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  }),

};