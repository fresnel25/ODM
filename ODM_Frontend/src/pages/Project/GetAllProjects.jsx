import React, { useEffect, useState } from "react";
import CardTable from "../../components/Utils/CardTable";
import { Edit, Eye, Trash } from "lucide-react";
import { toast } from "react-toastify";
import { deleteProjet, getProjetById, getProjets,} from "../../services/api/projetService";

const GetAllProjets = ({
  refresh,
  setSelectedProjet,
  setOpenView,
  setOpenEdit,
  refreshProjets,
}) => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProjets = async () => {
    try {
      const res = await getProjets();
      if (res.success) {
        setProjets(res.data.content);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjets();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteProjet(id);
      toast.success(response.message);
      refreshProjets();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleView = async (id) => {
    try {
      const res = await getProjetById(id);
      console.log(res)
      if (res.success) {
        setSelectedProjet(res.data);
        setOpenView(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleEdit = async (id) => {
    try {
      const res = await getProjetById(id);
      console.log(res)
      if (res.success) {
        setSelectedProjet(res.data);
        setOpenEdit(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const columns = [
    { key: "id", label: "ID" },

    { key: "nomProjet", label: "Nom du projet" },

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

  return <CardTable columns={columns} data={projets} />;
};

export default GetAllProjets;
