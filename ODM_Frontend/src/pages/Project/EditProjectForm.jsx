import React, { useEffect, useState } from "react";
import InputForm from "../../components/composant_formulaire/InputForm";
import Textarea from "../../components/Utils/Textarea";
import MultiSelectInput from "../../components/Utils/MultiSelectInput";
import { updateProjet } from "../../services/api/projetService";
import { getEquipes } from "../../services/api/equipeService";
import { toast } from "react-toastify";

const EditProjectForm = ({ projet, onSuccess }) => {
  const [nomProjet, setNomProjet] = useState("");
  const [description, setDescription] = useState("");

  const [equipes, setEquipes] = useState([]);
  const [selectedEquipes, setSelectedEquipes] = useState([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadEquipes();
  }, []);

  useEffect(() => {
    if (!projet) return;

    setNomProjet(projet.nomProjet || "");
    setDescription(projet.description || "");

    const equipesInitiales =
      projet.equipes?.map((equipe) => ({
        value: equipe.id,
        label: equipe.nomEquipe,
      })) || [];

    setSelectedEquipes(equipesInitiales);
  }, [projet]);

  const loadEquipes = async () => {
    try {
      const res = await getEquipes({
        page: 0,
        size: 100,
      });

      if (res.success) {
        setEquipes(res.data.content || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur chargement des équipes");
    }
  };

  const equipeOptions = equipes.map((equipe) => ({
    value: equipe.id,
    label: equipe.nomEquipe,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        nomProjet,
        description,
        equipeIds: selectedEquipes.map((equipe) => equipe.value),
      };

      const response = await updateProjet(projet.id, payload);

      toast.success(response.message || "Projet modifié");
      onSuccess?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la modification",
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-5">
          <InputForm
            label="Projet"
            value={nomProjet}
            onChange={(e) => setNomProjet(e.target.value)}
            placeholder="Libellé du projet"
          />

          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description du projet"
          />

          <MultiSelectInput
            label="Équipes associées"
            options={equipeOptions}
            value={selectedEquipes}
            onChange={(selected) => setSelectedEquipes(selected || [])}
            placeholder="Sélectionner une ou plusieurs équipes"
          />

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
              disabled={loading}
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
