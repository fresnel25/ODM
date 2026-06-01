import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";

import { useAuth } from "../../services/context/AuthContext";
import CardTable from "../../components/Utils/CardTable";

import {
  getMissions,
  deleteMission,
  getMissionById,
  missionApi,
} from "../../services/api/missionService";

const GetAllMissions = ({ refresh, refreshMissions }) => {
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchMissions = async () => {
    try {
      setLoading(true);
      const res = await getMissions({
        page,
        size: 10,
      });

      if (res.success) {
        setMissions(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    } catch {
      toast.error("Erreur chargement missions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [refresh, page]);

  const handleViewPdf = (id) => {
    window.open(
      `${import.meta.env.VITE_API_URL}/pdf/mission/${id}`,
      "_blank",
    );
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette mission ?")) return;

    try {
      await deleteMission(id);
      toast.success("Mission supprimée");
      refreshMissions();
    } catch {
      toast.error("Erreur suppression");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getMissionById(id);

      if (res.success) {
        // à brancher si modal edit
      }
    } catch {
      toast.error("Erreur chargement mission");
    }
  };

  const handleValidate = async (row) => {
    const newEtat = row.etat === "VALIDE" ? "SOUMIS" : "VALIDE";
    const confirmMsg =
      newEtat === "VALIDE"
        ? "Valider cette mission ?"
        : "Dévalider cette mission ?";
    if (!window.confirm(confirmMsg)) return;

    try {
      await missionApi.validate(row.id, { etat: newEtat });
      toast.success(
        newEtat === "VALIDE" ? "Mission validée" : "Validation annulée",
      );
      refreshMissions();
    } catch {
      toast.error("Erreur validation");
    }
  };

  const handleProcess = async (row) => {
    const confirmMsg = row.datePec
      ? "Annuler le traitement ?"
      : "Traiter cette mission ?";

    if (!window.confirm(confirmMsg)) return;

    try {
      await missionApi.process(row.id, {
        datePec: row.datePec ? null : new Date().toISOString(),
      });

      toast.success("Traitement mis à jour");
      refreshMissions();
    } catch {
      toast.error("Erreur traitement");
    }
  };

  const columns = [
    { key: "motif", label: "Motif" },
    { key: "user", label: "Agent" },
    { key: "projet", label: "Projet" },
    { key: "lieu", label: "Lieu" },

    {
      key: "dateD",
      label: "Départ",
      render: (v) => (v ? new Date(v).toLocaleDateString() : "-"),
    },
    {
      key: "dateR",
      label: "Retour",
      render: (v) => (v ? new Date(v).toLocaleDateString() : "-"),
    },

    { key: "etat", label: "Etat" },

    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2 justify-center">
          <button
            className="btn btn-xs btn-primary btn-soft"
            onClick={() => handleViewPdf(row.id)}
          >
            <Eye size={16} />
          </button>

          {/* USER EDIT */}
          {user?.role === "USER" && row.etat !== "VALIDE" && (
            <button
              className="btn btn-xs btn-warning btn-soft"
              onClick={() => handleEdit(row.id)}
            >
              <Edit size={16} />
            </button>
          )}

          {/* ADMIN */}
          {user?.role === "ADMIN" && (
            <button
              className={`btn btn-xs btn-soft ${
                row.etat === "VALIDE" ? "btn-warning" : "btn-success"
              }`}
              onClick={() => handleValidate(row)}
            >
              {row.etat === "VALIDE" ? "Dévalider" : "Valider"}
            </button>
          )}

          {/* SECRETARY */}
          {user?.role === "SECRETARY" && (
            <button
              className="btn btn-xs btn-info btn-soft"
              onClick={() => handleProcess(row)}
            >
              {row.datePec ? "Annuler" : "Traiter"}
            </button>
          )}

          {/* DELETE */}
          {user?.role === "ADMIN" && (
            <button
              className="btn btn-xs btn-error btn-soft"
              onClick={() => handleDelete(row.id)}
            >
              <Trash size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  // =========================
  // STATES UI
  // =========================
  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!missions.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Aucune mission trouvée
      </div>
    );
  }

  // =========================
  // RENDER
  // =========================
  return (
    <div className="flex flex-col gap-4">
      <CardTable columns={columns} data={missions} />

      {/* pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          className="btn btn-sm"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <span>
          {page + 1} / {totalPages}
        </span>

        <button
          className="btn btn-sm"
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetAllMissions;
