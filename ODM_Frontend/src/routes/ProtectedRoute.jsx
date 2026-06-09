import { Navigate } from "react-router-dom";
import { useAuth } from "../services/context/AuthContext";

export default function ProtectedRoute({ children }) {

  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return < Navigate to="/" />;
  }

  return children;
}