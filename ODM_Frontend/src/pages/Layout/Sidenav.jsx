import Navigation from "./Navigation";
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

const Sidenav = () => {

  const menuTop = () => [
    {
      label: "Tableau de bord",
      key: "dashboard",
      icon: <LayoutDashboard size={20} />,
      to: `/dashboard/`,
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
      label: "Missions",
      key: "missions",
      icon: <Users size={20} />,
      to: `/dashboard/missions`,
    },
     {
      label: "Lieux",
      key: "lieux",
      icon: <MapPin size={20} />,
      to: `/dashboard/lieux`,
    },
  ];

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
    },
  ];

  return (
    <div className="flex flex-col w-70 p-3 text-base-content gap-6">
      <div className="flex gap-2 justify-center px-1 py-3">
        <Leaf className="font-bold" />
        <h3 className="text-2xl font-bold text-base-content">
          ODM
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
