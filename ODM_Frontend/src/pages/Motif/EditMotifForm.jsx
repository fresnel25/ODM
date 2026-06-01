import React, { useEffect, useState } from "react";
import InputForm from "../../components/composant_formulaire/InputForm";
import Textarea from "../../components/Utils/Textarea";
import { updateMotif } from "../../services/api/motifService";
import { toast } from "react-toastify";

const EditMotifForm = ({ motif, onSuccess }) => {
  const [nomMotif, setNomMotif] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  // pré-remplissage automatique
  useEffect(() => {
    if (motif) {
      setNomMotif(motif.nomMotif || "");

      setDescription(motif.description || "");
    }
  }, [motif]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await updateMotif(motif.id, {
        nomMotif,
        description,
      });

      toast.success(response.message);

      onSuccess();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la modification",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5">
        {/* NOM */}
        <InputForm
          label="Motif"
          value={nomMotif}
          onChange={(e) => setNomMotif(e.target.value)}
          placeholder="Libellé du motif"
        />

        {/* DESCRIPTION */}
        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description du motif"
        />

        {/* BUTTON */}
        <div className="mt-5 flex justify-end">
          <button
            type="submit"
            className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Modifier"
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditMotifForm;
