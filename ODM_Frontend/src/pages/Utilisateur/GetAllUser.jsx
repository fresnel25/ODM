import CardTable from "../../components/Utils/CardTable";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Edit, Eye, Pencil, Trash } from "lucide-react";
import {
  deleteUser,
  getUserById,
  getUsers,
} from "../../services/api/utilisateurService";
import { toast } from "react-toastify";

const GetAllUser = ({
  refresh,
  setSelectedUser,
  setOpenView,
  setOpenEdit,
  refreshUsers,
}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await getUsers();
      if (res.success) {
        setUsers(res.data.content);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteUser(id);
      toast.success(response.message);
      refreshUsers();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getUserById(id);
      console.log(res);
      if (res.success) {
        setSelectedUser(res.data);
        setOpenEdit(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const roleLabels = {
    ADMIN: "Administrateur",
    SECRETARY: "Secrétaire",
    USER: "Utilisateur",
  };

  const userColumns = [
    { key: "id", label: "ID" },
    /* {
      key: "index",
      label: "#",
      render: (_, __, index) => index + 1,
    }, */

    { key: "firstName", label: "Prénom" },
    { key: "name", label: "Nom" },

    { key: "email", label: "Email" },

    {
      key: "role",
      label: "Role",
      render: (value) => roleLabels[value] || value,
    },

    {
      key: "actions",
      label: "Actions",
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

  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }

  //if (error) return <p>{error}</p>;

  return (
    <div>
      <div>
        <CardTable columns={userColumns} data={users} />
      </div>
    </div>
  );
};

export default GetAllUser;
