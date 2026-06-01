
import React, { useEffect, useState } from "react";
import InputForm from "../../components/composant_formulaire/InputForm";
import Textarea from "../../components/Utils/Textarea";
import { updateProjet } from "../../services/api/projetService";
import { toast } from "react-toastify";

const EditProjectForm = ({projet, onSuccess}) => {
  const [nomProjet, setNomProjet] = useState("");
  const [description, setDescription] = useState("");

  const [loading, setLoading] = useState(false);

  // pré-remplissage automatique
  useEffect(() => {
    if (projet) {
      setNomProjet(projet.nomProjet || "");

      setDescription(projet.description || "");
    }
  }, [projet]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await updateProjet(projet.id, {
        nomProjet,
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
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          {/* NOM */}
          <InputForm
            label="projet"
            value={nomProjet}
            onChange={(e) => setNomProjet(e.target.value)}
            placeholder="Libellé du projet"
          />

          {/* DESCRIPTION */}
          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du projet"
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
    </div>
  );
};

export default EditProjectForm;
