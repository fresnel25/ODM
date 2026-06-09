import { useSettings } from "../../services/context/SettingsContext";

const AppLogo = ({ logoName, appName, size = 60 }) => {
  const API_URL = import.meta.env.VITE_API_URL;

  if (!logoName) {
    const initials = appName?.substring(0, 2).toUpperCase() || "AP";

    return (
      <div
        className="rounded-full bg-primary text-white flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={`${API_URL}/settings/logo/${logoName}`}
      alt="logo"
      className="rounded-full object-cover"
      style={{ width: size, height: size }}
    />
  );
};

export default AppLogo;
