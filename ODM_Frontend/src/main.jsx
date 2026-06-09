import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./services/context/AuthContext.jsx";
import { SettingsProvider } from "./services/context/SettingsContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <SettingsProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </SettingsProvider>
  </AuthProvider>,
);
