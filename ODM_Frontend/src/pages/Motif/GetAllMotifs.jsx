import React, { useEffect, useState } from "react";
import CardTable from "../../components/Utils/CardTable";

import {
  deleteMotif,
  getMotifs,
  getMotifById,
} from "../../services/api/motifService";

import { Edit, Eye, Trash } from "lucide-react";
import { toast } from "react-toastify";

const GetAllMotifs = ({
  refresh,
  setSelectedMotif,
  setOpenView,
  setOpenEdit,
  refreshMotifs,
}) => {
  const [motifs, setMotifs] = useState([]);

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

  const fetchMotifs = async () => {
    try {
      setLoading(true);

      const res = await getMotifs({
        page,
        size,
        search: debouncedSearch,
      });

      if (res.success) {
        setMotifs(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur chargement des motifs",
      );
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchMotifs();
  }, [refresh, page, size, debouncedSearch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer ce motif ?")) return;

    try {
      const response = await deleteMotif(id);

      toast.success(response.message || "Motif supprimé");

      if (motifs.length === 1 && page > 0) {
        setPage((prev) => prev - 1);
      } else {
        refreshMotifs?.();
        fetchMotifs();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression",
      );
    }
  };

  const handleView = async (id) => {
    try {
      const res = await getMotifById(id);

      if (res.success) {
        setSelectedMotif(res.data);
        setOpenView(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur chargement du motif",
      );
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getMotifById(id);

      if (res.success) {
        setSelectedMotif(res.data);
        setOpenEdit(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur chargement du motif",
      );
    }
  };

  const columns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "nomMotif",
      label: "Nom du motif",
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
      data={motifs}
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

export default GetAllMotifs;
