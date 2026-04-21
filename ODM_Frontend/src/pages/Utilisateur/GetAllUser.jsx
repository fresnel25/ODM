import CardTable from "../../components/Utils/CardTable";
import { deleteUtilisateur, getUtilisateurs } from "../../API/utilisateurApi";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Pencil, Trash } from "lucide-react";

const GetAllUser = () => {
  const [utilisateur, setUtilisateur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { tenantSlug } = useParams();

  const fetchUtilisateur = () => {
    setLoading(true);
    getUtilisateurs()
      .then((res) => setUtilisateur(res.data.member))
      .catch(() => setError("Erreur de chargement"))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchUtilisateur();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;
    deleteUtilisateur(id).then(() => fetchUtilisateur());
  };

  const userColumns = [
    { key: "id", label: "ID" },
    { key: "nom", label: "Nom Utilisateur" },
    { key: "prenom", label: "Prenom Utilisateur" },
    {
      key: "roles",
      label: "Roles",
      render: (roles) => (
        <div className="flex gap-1">
          {roles.map((role) => (
            <span key={role} className="badge badge-accent">
              {role.replace("ROLE_", "")}
            </span>
          ))}
        </div>
      ),
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-3">
          <button
            className="btn btn-sm btn-warning"
            onClick={() =>
              navigate(`/dashboard/${tenantSlug}/utilisateurs/edit/${row.id}`)
            }
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="btn btn-sm btn-neutral"
          >
            <Trash size={16} />
          </button>
        </div>
      ),
    },
  ];

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        <CardTable columns={userColumns} data={utilisateur} />
      </div>
    </div>
  );
};

export default GetAllUser;
