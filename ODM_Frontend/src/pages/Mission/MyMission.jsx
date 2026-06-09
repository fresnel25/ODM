import { useEffect, useState } from "react";
import { Eye, Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import CardTable from "../../components/Utils/CardTable";
import Page_Title from "../../components/Page-Title/Page_Title";
import ModalForm from "../../components/Utils/ModalForm";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";

import {
  getMissionById,
  getMyMissions,
} from "../../services/api/missionService";

import CreateMission from "./CreateMission";
import EditMission from "./EditMission";

const MyMission = () => {
  const navigate = useNavigate();

  const [missions, setMissions] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [reloadKey, setReloadKey] = useState(0);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedMission, setSelectedMission] = useState(null);

  const refreshMissions = () => {
    setReloadKey((prev) => prev + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchMissions = async () => {
    try {
      setLoading(true);

      const res = await getMyMissions({
        page,
        size,
        search: debouncedSearch,
      });

      if (res.success) {
        setMissions(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des missions",
      );
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchMissions();
  }, [page, size, debouncedSearch, reloadKey]);

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

  const handleViewPdf = (id) => {
    window.open(`${import.meta.env.VITE_API_URL}/pdf/mission/${id}`, "_blank");
  };

  const columns = [
    {
      key: "motif",
      label: "Motif",
      render: (_, row) => row.motif?.nomMotif || "-",
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
      render: (value) => {
        const isValide = value === "VALIDE";

        return (
          <span
            className={`badge badge-soft ${
              isValide ? "badge-success" : "badge-warning"
            }`}
          >
            {isValide ? "Validé" : "Soumis"}
          </span>
        );
      },
    },
    {
      key: "actions",
      label: "Actions",
      enableSorting: false,
      render: (_, row) => (
        <div className="flex gap-2 justify-center">
          <button
            className="btn btn-xs btn-primary btn-soft"
            onClick={() => handleViewPdf(row.id)}
          >
            <Eye size={16} />
          </button>

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

  if (initialLoading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      <Page_Title Title="Mes missions" />

      <div className="flex justify-end">
        <ButtonForm
          title="Nouvelle mission"
          onClick={() => setOpenCreate(true)}
          icon={<Plus size={18} />}
        />
      </div>

      <CardTable
        columns={columns}
        data={missions}
        searchValue={search}
        onSearchChange={setSearch}
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

      <ModalForm
        titre="Créer une mission"
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
        titre="Modifier une mission"
        isOpen={openEdit}
        onClose={() => setOpenEdit(false)}
      >
        <EditMission
          mission={selectedMission}
          onSuccess={() => {
            setOpenEdit(false);
            refreshMissions();
          }}
          onClose={() => setOpenEdit(false)}
        />
      </ModalForm>
    </div>
  );
};

export default MyMission;
