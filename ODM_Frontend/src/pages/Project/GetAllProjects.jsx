import React, { useEffect, useState } from "react";
import CardTable from "../../components/Utils/CardTable";
import { Edit, Eye, Trash } from "lucide-react";
import { toast } from "react-toastify";
import {
  deleteProjet,
  getProjetById,
  getProjets,
} from "../../services/api/projetService";

const GetAllProjets = ({
  refresh,
  setSelectedProjet,
  setOpenView,
  setOpenEdit,
  refreshProjets,
}) => {
  const [projets, setProjets] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchProjets = async () => {
    try {
      setLoading(true);

      const res = await getProjets({
        page,
        size,
        search: debouncedSearch,
      });

      if (res.success) {
        setProjets(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur chargement des projets",
      );
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchProjets();
  }, [refresh, page, size, debouncedSearch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce projet ?")) return;

    try {
      const response = await deleteProjet(id);

      toast.success(response.message || "Projet supprimé");

      if (projets.length === 1 && page > 0) {
        setPage((prev) => prev - 1);
      } else {
        refreshProjets?.();
        fetchProjets();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression",
      );
    }
  };

  const handleView = async (id) => {
    try {
      const res = await getProjetById(id);

      if (res.success) {
        setSelectedProjet(res.data);
        setOpenView(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur chargement du projet",
      );
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getProjetById(id);

      if (res.success) {
        setSelectedProjet(res.data);
        setOpenEdit(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur chargement du projet",
      );
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "nomProjet",
      label: "Nom du projet",
    },
    {
      key: "actions",
      label: "Actions",
      enableSorting: false,
      render: (_, row) => (
        <div className="flex gap-5 justify-center">
          <button
            className="btn btn-xs btn-error btn-soft"
            onClick={() => handleDelete(row.id)}
          >
            <Trash size={16} />
          </button>

          <button
            className="btn btn-xs btn-warning btn-soft"
            onClick={() => handleEdit(row.id)}
          >
            <Edit size={16} />
          </button>

          <button
            className="btn btn-xs btn-primary btn-soft"
            onClick={() => handleView(row.id)}
          >
            <Eye size={16} />
          </button>
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
    <CardTable
      columns={columns}
      data={projets}
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
  );
};

export default GetAllProjets;
