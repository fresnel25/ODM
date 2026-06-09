import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, logoutRequest } from "../authService";
import api from "../api";
import {
  setToken,
  removeToken,
  getToken,
  getUserStorage,
  setUserStorage,
  removeUserStorage,
} from "../tokenService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setAuthToken] = useState(() => getToken());
  const [user, setUser] = useState(() => getUserStorage());

  useEffect(() => {
    if (!token) return;

    const init = async () => {
      try {
        await loadUser();
      } catch (e) {
        console.log("Erreur loadUser", e);
      }
    };
    init();
  }, [token]);

  const loadUser = async () => {
    const res = await api.get("/auth/me");
    const userData = res.data.data;
    setUser(userData);
    setUserStorage(userData);
    return userData;
  };

  const login = async (email, password) => {
    const response = await loginRequest({ email, password });
    const accessToken = response.data.data.token;
    if (!accessToken || accessToken === "undefined") {
      throw new Error("Token invalide reçu du backend");
    }
    setToken(accessToken);
    setAuthToken(accessToken);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (e) {
      console.log(e);
    }
    removeUserStorage();
    removeToken();
    setAuthToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        login,
        logout,
        loadUser,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
