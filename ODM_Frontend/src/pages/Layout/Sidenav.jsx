import Navigation from "./Navigation";
import { useAuth } from "../../services/context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  Leaf,
  LayoutDashboard,
  LogOut,
  Settings,
  MessageCircleQuestionMark,
  Users,
  BriefcaseBusiness,
  Info,
  MapPin,
} from "lucide-react";
import { useSettings } from "../../services/context/SettingsContext";

const Sidenav = () => {
  const { user, logout } = useAuth();
  const { settings, loading } = useSettings();

  const navigate = useNavigate();

  const accessRole = ["ADMIN", "SECRETARY"].includes(user?.role);
  console.log(accessRole);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  console.log(settings);

  const menuTop = () => {
    const items = [
      {
        label: "Tableau de bord",
        key: "dashboard",
        icon: <LayoutDashboard size={20} />,
        to: `/dashboard/`,
      },
      {
        label: "Mon Profil",
        key: "profile",
        icon: <Users size={20} />,
        to: `/dashboard/profile`,
      },
      {
        label: "Mes Missions",
        key: "myMissions",
        icon: <Users size={20} />,
        to: `/dashboard/myMissions`,
      },
    ];
    if (accessRole) {
      items.push(
        {
          label: "Utilisateurs",
          key: "utilisateur",
          icon: <Users size={20} />,
          to: `/dashboard/utilisateurs`,
        },
        {
          label: "Equipes",
          key: "equipes",
          icon: <Users size={20} />,
          to: `/dashboard/equipes`,
        },
        {
          label: "Projets",
          key: "projets",
          icon: <BriefcaseBusiness size={20} />,
          to: `/dashboard/projets`,
        },
        {
          label: "Motifs",
          key: "motifs",
          icon: <Info size={20} />,
          to: `/dashboard/motifs`,
        },
        {
          label: "Missions",
          key: "missions",
          icon: <Users size={20} />,
          to: `/dashboard/missions`,
        },
      );
    }
    return items;
  };

  const menuBottom = () => [
    {
      label: "Paramètre",
      key: "parametre",
      icon: <Settings size={20} />,
      to: `/dashboard/parametres`,
    },
    {
      label: "Aide et Support",
      key: "support",
      icon: <MessageCircleQuestionMark size={20} />,
      to: `/dashboard/supports`,
    },
    {
      label: "Déconnexion",
      key: "deconnexion",
      icon: <LogOut size={20} />,
      onClick: handleLogout,
    },
  ];


  return (
    <div className="flex flex-col w-70 p-3 text-base-content gap-6">
      <div className="flex gap-2 justify-center px-1 py-3 items-center">
        {settings?.logoName ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/settings/logo/${settings.logoName}`}
            alt="logo"
            className="w-10 h-10 object-cover rounded-full"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
            {settings?.appName?.substring(0, 2).toUpperCase() || "AP"}
          </div>
        )}

        <h3 className="text-2xl font-bold text-base-content">
          {settings?.appName}
        </h3>
      </div>

      {/*  On appelle les fonctions avec tenantSlug pour récupérer les tableaux */}
      <div className="flex-1 py-8 flex flex-col">
        <Navigation list={menuTop()} />
      </div>
      <div className="flex-1 py-8 flex flex-col pt-2 border-t">
        <Navigation list={menuBottom()} />
      </div>
    </div>
  );
};

export default Sidenav;
