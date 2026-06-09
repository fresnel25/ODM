import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Edit, Trash } from "lucide-react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
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
  const [search, setSearch] = useState("");
  const [size, setSize] = useState(10);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchMissions = async () => {
    try {
      setLoading(true);

      const res = await getMissions({
        page,
        size,
        search,
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
  }, [refresh, page, size, search]);

  const handleViewPdf = (id) => {
    window.open(`${import.meta.env.VITE_API_URL}/pdf/mission/${id}`, "_blank");
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

    const result = await Swal.fire({
      title: "Confirmation",
      text: confirmMsg,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });
    if (!result.isConfirmed) return;
    try {
      await missionApi.validate(row.id, { etat: newEtat });
      toast.success(
        newEtat === "VALIDE" ? "Mission validée" : "Validation annulée",
      );
      refreshMissions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur traitement");
    }
  };

  const handleProcess = async (row) => {
    const isAlreadyProcessed = Boolean(row.datePec);

    const confirmMsg = isAlreadyProcessed
      ? "Annuler le traitement de cette mission ?"
      : "Traiter cette mission ?";

    const result = await Swal.fire({
      title: "Confirmation",
      text: confirmMsg,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Oui",
      cancelButtonText: "Annuler",
    });

    if (!result.isConfirmed) return;

    try {
      await missionApi.process(row.id, {
        datePec: isAlreadyProcessed ? null : new Date().toISOString(),
      });

      toast.success(
        isAlreadyProcessed
          ? "Traitement annulé"
          : "Mission marquée comme traitée",
      );

      refreshMissions();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur traitement");
    }
  };

  const columns = [
    {
      key: "motif",
      label: "Motif",
      render: (_, row) => row.motif?.nomMotif || "-",
    },
    {
      key: "user",
      label: "Agent",
    },
    {
      key: "projet",
      label: "Projet",
      render: (_, row) => row.projet?.nomProjet || "-",
    },
    {
      key: "lieu",
      label: "Lieu",
    },
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
    {
      key: "etat",
      label: "Etat",
    },
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

          {user?.role === "USER" && row.etat !== "VALIDE" && (
            <button
              className="btn btn-xs btn-warning btn-soft"
              onClick={() => handleEdit(row.id)}
            >
              <Edit size={16} />
            </button>
          )}

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

          {user?.role === "SECRETARY" && (
            <button
              className="btn btn-xs btn-info btn-soft"
              onClick={() => handleProcess(row)}
            >
              {row.datePec ? "Annuler" : "Traiter"}
            </button>
          )}

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

  if (loading && missions.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <CardTable
      columns={columns}
      data={missions}
      searchValue={search}
      onSearchChange={(value) => {
        setSearch(value);
        setPage(0);
      }}
      page={page}
      totalPages={totalPages}
      onPageChange={setPage}
      pageSize={size}
      onPageSizeChange={(value) => {
        setSize(value);
        setPage(0);
      }}
      loading={loading}
    />
  );
};

export default GetAllMissions;
