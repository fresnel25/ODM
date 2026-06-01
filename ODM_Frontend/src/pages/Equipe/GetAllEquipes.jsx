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

  const fetchEquipes = async () => {
    try {
      const res = await getEquipes();
      if (res.success) {
        setEquipes(res.data.content);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEquipes();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteEquipe(id);
      toast.success(response.message);
      refreshEquipes();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await getEquipeById(id);
      console.log(res);
      if (res.success) {
        setSelectedEquipe(res.data);
        setOpenView(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getEquipeById(id);
      console.log(res);
      if (res.success) {
        setSelectedEquipe(res.data);
        setOpenEdit(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const columns = [
    { key: "id", label: "ID" },

    { key: "nomEquipe", label: "Nom Equipe" },

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
            onClick={() => handleView(row.id)}
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

  return <CardTable columns={columns} data={equipes} />;
};

export default GetAllEquipes;
