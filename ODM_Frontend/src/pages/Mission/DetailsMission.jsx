import { useEffect, useState } from "react";
import { Eye, Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CardTable from "../../components/Utils/CardTable";
import Page_Title from "../../components/Page-Title/Page_Title";
import ModalForm from "../../components/Utils/ModalForm";
import {
  getMissionById,
  getMyMissions,
} from "../../services/api/missionService";
import CreateMission from "./CreateMission";
import EditMission from "./EditMission";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";

const DetailsMission = () => {
  const navigate = useNavigate();
  const [missions, setMissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reloadKey, setReloadKey] = useState(0);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const refreshMissions = () => {
    setReloadKey((prev) => prev + 1);
  };

  const fetchMissions = async () => {
    try {
      setLoading(true);

      const res = await getMyMissions({
        page,
        size: 10,
      });

      if (res.success) {
        setMissions(res.data.content);
        setTotalPages(res.data.totalPages);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des missions",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [page, reloadKey]);

  const handleEdit = async (id) => {
    try {
      const res = await getMissionById(id);

      if (res.success) {
        setSelectedMission(res.data);
        setOpenEdit(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur chargement mission");
    }
  };

  const columns = [
    {
      key: "motif",
      label: "Motif",
    },

    {
      key: "projet",
      label: "Projet",
    },

    {
      key: "lieu",
      label: "Lieu",
    },

    {
      key: "dateD",
      label: "Départ",
      render: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
    },

    {
      key: "dateR",
      label: "Retour",
      render: (value) => (value ? new Date(value).toLocaleDateString() : "-"),
    },

    {
      key: "etat",
      label: "Etat",
      render: (value) => (
        <span
          className={`badge ${
            value === "VALIDE" ? "badge-success" : "badge-warning"
          }`}
        >
          {value}
        </span>
      ),
    },

    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <div className="flex gap-2 justify-center">
          {/* PDF */}
          <button
            className="btn btn-xs btn-primary btn-soft"
            onClick={() => navigate(`/dashboard/missions/${row.id}/pdf`)}
          >
            <Eye size={16} />
          </button>

          {/* EDIT */}
          {row.etat !== "VALIDE" && (
            <button
              className="btn btn-xs btn-warning btn-soft"
              onClick={() => handleEdit(row.id)}
            >
              <Edit size={16} />
            </button>
          )}
        </div>
      ),
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <Page_Title Title={"Mes missions"} />
      </div>

      <div className="flex justify-end">
        <ButtonForm title="Nouvelle mission" onClick={() => setOpenCreate(true)} icon={<Plus size={18} />}/>
      </div>

      {!missions.length ? (
        <div className="bg-base-100 rounded-2xl shadow p-10 text-center">
          <p className="text-lg font-semibold text-gray-500">
            Aucune mission trouvée
          </p>
        </div>
      ) : (
        <>
          <CardTable columns={columns} data={missions} />

          <div className="flex justify-center items-center gap-3 mt-5">
            <button
              className="btn btn-sm"
              disabled={page === 0}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Précédent
            </button>

            <span className="font-semibold">
              Page {page + 1} / {totalPages}
            </span>

            <button
              className="btn btn-sm"
              disabled={page + 1 >= totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Suivant
            </button>
          </div>
        </>
      )}

      <ModalForm
        titre={"Créer une mission"}
        isOpen={openCreate}
        onClose={() => setOpenCreate(false)}
      >
        <CreateMission
          onSuccess={() => {
            setOpenCreate(false);
            refreshMissions();
          }}
        />
      </ModalForm>

      <ModalForm
        titre={"Modifier une mission"}
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
      >
        <EditMission
          mission={selectedMission}
          onSuccess={() => {
            setOpenEdit(false);
            refreshMissions();
          }}
        />
      </ModalForm>
    </div>
  );
};

export default DetailsMission;
