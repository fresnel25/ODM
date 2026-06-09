import { useState } from "react";
import { toast } from "react-toastify";
import ModalForm from "../../components/Utils/ModalForm";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import EquipeForm from "./EquipeForm";
import { createEquipe } from "../../services/api/equipeService";

const CreateEquipe = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async (payload) => {
    try {
      setLoading(true);
      const response = await createEquipe(payload);
      toast.success(response.message);
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur création équipe");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex justify-end mt-5">
        <ButtonForm title="Ajouter une équipe" onClick={() => setOpen(true)} />
      </div>

      <ModalForm
        titre="Création équipe"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <EquipeForm
          onSubmit={handleCreate}
          submitLabel="Créer"
          loading={loading}
        />
      </ModalForm>
    </>
  );
};

export default CreateEquipe;
