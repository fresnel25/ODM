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
        <div className="card-body">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           
            <div className="flex flex-col items-center gap-7">
              <div className="avatar placeholder">
                <div className="bg-primary text-white rounded-full w-30 h-30 lg:w-40 lg:h-40 flex items-center justify-center">
                  <span className="text-6xl font-bold">
                    {user?.firstName?.[0]}
                    {user?.name?.[0]}
                  </span>
                </div>
              </div>

              <div className="text-center">
                <h2 className="text-2xl lg:text-4xl font-bold">
                  {user.firstName} {user.name}
                </h2>
              </div>

              
              <div className={getRoleBadgeClass(user.role)}>
                {getRoleLabel(user.role)}
              </div>
            </div>

            
            <div className="flex flex-col gap-5 text-lg">
              <div>
                <p className="text-sm text-base-content/60">Email</p>
                <p className="font-semibold">{user.email}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">Équipe</p>
                <p className="font-semibold">{user.equipe}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">Grade</p>
                <p className="font-semibold">{user.grade}</p>
              </div>
            </div>

            
            <div className="flex flex-col gap-5 text-lg">
              <div>
                <p className="text-sm text-base-content/60">Type personnel</p>
                <p className="font-semibold">{user.personnelType}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">Date naissance</p>
                <p className="font-semibold">{user.dateNaissance}</p>
              </div>

              <div>
                <p className="text-sm text-base-content/60">IM Véhicule</p>
                <p className="font-semibold">{user.imVehicule}</p>
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
