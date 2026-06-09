import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../services/context/AuthContext";
import ModalForm from "../../components/Utils/ModalForm";
import { getUserById } from "../../services/api/utilisateurService";
import EditUserFormByOwner from "./EditForm/EditUserFormByOwner";
import Page_Title from "../../components/Page-Title/Page_Title";

const Profile = () => {
  const { id } = useParams();
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const isOwner = !id || Number(id) === currentUser?.id;

  const fetchUser = async () => {
    try {
      if (!id) {
        setUser(currentUser);
        return;
      }
      const res = await getUserById(id);
      if (res.success) setUser(res.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  const ROLE_LABELS = {
    SECRETARY: "Secrétaire",
    USER: "Utilisateur",
    ADMIN: "Chef d'équipe",
  };

  const ROLE_BADGES = {
    ADMIN: "badge badge-primary",
    SECRETARY: "badge badge-warning",
    USER: "badge badge-accent",
  };

  const getRoleLabel = (role) => ROLE_LABELS[role] || role;
  const getRoleBadgeClass = (role) => ROLE_BADGES[role] || "badge";

  const PERSONNEL_TYPE_LABELS = {
    PE: "Personnalité Extérieure",
    PU: "Personnel Université",
    DO: "Doctorant",
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <Page_Title Title="Profil utilisateur" />
      </div>

      <div className="flex justify-end md:justify-end sm:justify-center">
        {isOwner && (
          <button className="btn btn-primary" onClick={() => setOpenEdit(true)}>
            Modifier profil
          </button>
        )}
      </div>

      <div className="card bg-base-100 shadow-xl rounded-2xl">
        <div className="card-body gap-8">
          {/* ================= HEADER PROFIL ================= */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary/20 via-base-200 to-base-100 border border-base-content/10 shadow-sm">
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-secondary/20 rounded-full blur-2xl"></div>

            <div className="relative flex flex-col items-center justify-center gap-5 py-10 px-5">
              <div className="avatar placeholder">
                <div className="bg-primary text-primary-content rounded-full w-28 h-28 lg:w-36 lg:h-36 ring ring-primary/30 ring-offset-base-100 ring-offset-4 shadow-xl flex items-center justify-center">
                  <span className="text-5xl lg:text-6xl font-bold leading-none uppercase">
                    {user?.firstName?.[0]}
                    {user?.name?.[0]}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight">
                  {user?.firstName} {user?.name}
                </h2>

                <p className="mt-2 text-base-content/60 text-sm lg:text-base">
                  {user?.email || "Aucun email renseigné"}
                </p>
              </div>

              <div className={`${getRoleBadgeClass(user?.role)} shadow-md`}>
                {getRoleLabel(user?.role)}
              </div>
            </div>
          </div>

          {/* ================= INFOS PROFIL ================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-base-content/60">Équipe</p>
              <p className="mt-1 text-lg font-bold">
                {user?.equipe?.nomEquipe || "-"}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-base-content/60">Grade</p>
              <p className="mt-1 text-lg font-bold">{user?.grade || "-"}</p>
            </div>

            <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-base-content/60">Type personnel</p>
              <p className="mt-1 text-lg font-bold">
                {PERSONNEL_TYPE_LABELS[user?.personnelType] || "-"}
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-base-100 border border-base-content/10 shadow-sm hover:shadow-md transition">
              <p className="text-sm text-base-content/60">Date naissance</p>
              <p className="mt-1 text-lg font-bold">
                {user?.dateNaissance || "-"}
              </p>
            </div>
          </div>

          {/* ================= DETAILS ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-3xl bg-base-100 border border-base-content/10 shadow-sm p-6">
              <h3 className="text-xl font-bold mb-5">
                Informations administratives
              </h3>

              <div className="space-y-5">
                <div className="flex justify-between gap-4 border-b border-base-content/10 pb-3">
                  <span className="text-base-content/60">Email</span>
                  <span className="font-semibold text-right">
                    {user?.email || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-4 border-b border-base-content/10 pb-3">
                  <span className="text-base-content/60">
                    Résidence administrative
                  </span>
                  <span className="font-semibold text-right">
                    {user?.residenceAdmin2 || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-base-content/60">
                    Adresse personnelle
                  </span>
                  <span className="font-semibold text-right">
                    {user?.adresseAgent1 || "-"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-base-100 border border-base-content/10 shadow-sm p-6">
              <h3 className="text-xl font-bold mb-5">Véhicule</h3>

              <div className="space-y-5">
                <div className="flex justify-between gap-4 border-b border-base-content/10 pb-3">
                  <span className="text-base-content/60">Immatriculation</span>
                  <span className="font-semibold text-right">
                    {user?.imVehicule || "-"}
                  </span>
                </div>

                <div className="flex justify-between gap-4">
                  <span className="text-base-content/60">
                    Puissance fiscale
                  </span>
                  <span className="font-semibold text-right">
                    {user?.pfVehicule || "-"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalForm
        titre="Modifier mon profil"
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
      >
        <EditUserFormByOwner
          user={user}
          onSuccess={() => {
            fetchUser();
            setOpenEdit(false);
          }}
        />
      </ModalForm>
    </div>
  );
};

export default Profile;
