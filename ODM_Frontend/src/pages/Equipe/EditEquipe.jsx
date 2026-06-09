import { useState } from "react";
import { toast } from "react-toastify";
import ModalForm from "../../components/Utils/ModalForm";
import EquipeForm from "./EquipeForm";
import { updateEquipe } from "../../services/api/equipeService";

const EditEquipe = ({ openEdit, setOpenEdit, selectedEquipe, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (payload) => {
    try {
      setLoading(true);

      const response = await updateEquipe(selectedEquipe.id, payload);

      toast.success(response.message);

      setOpenEdit(false);

      onSuccess?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la modification",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalForm
      titre="Modifier équipe"
      isOpen={openEdit}
      onClose={() => setOpenEdit(false)}
    >
      {selectedEquipe && (
        <EquipeForm
          initialData={selectedEquipe}
          submitLabel="Modifier"
          loading={loading}
          onSubmit={handleUpdate}
        />
      )}
    </ModalForm>
  );
};

export default EditEquipe;
