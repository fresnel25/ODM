import React, { useEffect, useState } from "react";
import CardTable from "../../components/Utils/CardTable";
import { Edit, Eye, Trash } from "lucide-react";
import { toast } from "react-toastify";
import {
  deleteEquipe,
  getEquipeById,
  getEquipes,
} from "../../services/api/equipeService";

const GetAllEquipes = ({
  refresh,
  setSelectedEquipe,
  setOpenView,
  setOpenEdit,
  refreshEquipes,
}) => {
  const [equipes, setEquipes] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const fetchEquipes = async () => {
    try {
      setLoading(true);

      const res = await getEquipes({
        page,
        size,
        search: debouncedSearch,
      });

      if (res.success) {
        setEquipes(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur chargement des équipes",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipes();
  }, [refresh, page, size, debouncedSearch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette équipe ?")) return;
    try {
      const response = await deleteEquipe(id);
      toast.success(response.message || "Équipe supprimée");
      if (equipes.length === 1 && page > 0) {
        setPage((prev) => prev - 1);
      } else {
        refreshEquipes?.();
        fetchEquipes();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression",
      );
    }
  };

  const handleView = async (id) => {
    try {
      const res = await getEquipeById(id);
      if (res.success) {
        setSelectedEquipe(res.data);
        setOpenView(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur chargement équipe");
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getEquipeById(id);
      if (res.success) {
        setSelectedEquipe(res.data);
        setOpenEdit(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur chargement équipe");
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "nomEquipe",
      label: "Nom équipe",
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

  if (loading && equipes.length === 0) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  return (
    <CardTable
      columns={columns}
      data={equipes}
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

export default GetAllEquipes;
