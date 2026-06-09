import CardTable from "../../components/Utils/CardTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Edit, Eye, Trash } from "lucide-react";
import {
  deleteUser,
  getUserById,
  getUsers,
} from "../../services/api/utilisateurService";
import { toast } from "react-toastify";

const GetAllUser = ({
  refresh,
  setSelectedUser,
  setOpenEdit,
  refreshUsers,
}) => {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getUsers({
        page,
        size,
        search: debouncedSearch,
      });

      if (res.success) {
        setUsers(res.data.content || []);
        setTotalPages(res.data.totalPages || 0);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement des utilisateurs",
      );
      console.error(error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh, page, size, debouncedSearch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cet utilisateur ?")) return;

    try {
      const response = await deleteUser(id);
      toast.success(response.message || "Utilisateur supprimé");

      if (users.length === 1 && page > 0) {
        setPage((prev) => prev - 1);
      } else {
        refreshUsers?.();
        fetchUsers();
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la suppression",
      );
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getUserById(id);

      if (res.success) {
        setSelectedUser(res.data);
        setOpenEdit(true);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Erreur lors du chargement de l'utilisateur",
      );
    }
  };

  const roleLabels = {
    ADMIN: "Administrateur",
    SECRETARY: "Secrétaire",
    USER: "Utilisateur",
  };

  const userColumns = [
    {
      key: "id",
      label: "ID",
    },
    {
      key: "firstName",
      label: "Prénom",
    },
    {
      key: "name",
      label: "Nom",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "role",
      label: "Rôle",
      render: (value) => (
        <span
          className={`badge badge-soft  ${
            value === "ADMIN"
              ? "badge-primary"
              : value === "SECRETARY"
                ? "badge-info"
                : "badge-warning"
          }`}
        >
          {roleLabels[value] || value || "-"}
        </span>
      ),
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
            onClick={() => navigate(`/dashboard/utilisateurs/${row.id}`)}
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
      columns={userColumns}
      data={users}
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

export default GetAllUser;
