export const setToken = (token) => {
  if (token && token !== "undefined") {
    localStorage.setItem("accessToken", token);
  }
};

export const getToken = () => {
  const token = localStorage.getItem("accessToken");
  return token && token !== "undefined" ? token : null;
};

export const removeToken = () => {
  localStorage.removeItem("accessToken");
};

export const setUserStorage = (user) => {
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const getUserStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

export const removeUserStorage = () => {
  localStorage.removeItem("user");
};