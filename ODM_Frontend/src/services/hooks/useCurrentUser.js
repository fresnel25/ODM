import { useAuth } from "../context/AuthContext";


export const useCurrentUser = () => {
  const { user } = useAuth();
  return user;
};

export const canEditMission = (user, mission) =>
  user?.role === "USER" && mission.etat !== "VALIDE";

export const canValidateMission = (user) =>
  user?.role === "ADMIN";

export const canProcessMission = (user, mission) =>
  user?.role === "SECRETARY" && !mission.datePec;