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
  const [loading, setLoading] = useState(true);

  const fetchMotifs = async () => {
    try {
      const res = await getMotifs();
      if (res.success) {
        setMotifs(res.data.content);
      }
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMotifs();
  }, [refresh]);

  const handleDelete = async (id) => {
    try {
      const response = await deleteMotif(id);
      toast.success(response.message);
      refreshMotifs();
    } catch (error) {
      toast.error(error.response?.data?.message);
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
      toast.error(error.response?.data?.message);
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
      toast.error(error.response?.data?.message);
    }
  };

  const columns = [
    { key: "id", label: "ID" },

    { key: "nomMotif", label: "Nom du motif" },

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

  return <CardTable columns={columns} data={motifs} />;
};

export default GetAllMotifs;
