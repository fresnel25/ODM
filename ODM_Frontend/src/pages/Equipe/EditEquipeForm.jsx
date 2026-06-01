import React, { useEffect, useState } from "react";
import InputForm from "../../components/composant_formulaire/InputForm";
import Textarea from "../../components/Utils/Textarea";
import MultiSelectInput from "../../components/Utils/MultiSelectInput";
import { toast } from "react-toastify";
import { updateEquipe } from "../../services/api/equipeService";
import { getProjets } from "../../services/api/projetService";

const EditEquipeForm = ({ equipe, onSuccess }) => {
  const [nomEquipe, setNomEquipe] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [projets, setProjets] = useState([]);
  const [selectedProjets, setSelectedProjets] = useState([]);

  // Charger tous les projets
  const fetchProjets = async () => {
    try {
      const res = await getProjets();
      if (res.success) {
        setProjets(res.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Pré-remplissage
  useEffect(() => {
    fetchProjets();
    if (equipe) {
      setNomEquipe(equipe.nomEquipe || "");
      setDescription(equipe.description || "");
      // pré-remplissage des projets sélectionnés
      setSelectedProjets(
        equipe.projets?.map((projet) => ({
          value: projet.id,
          label: projet.nomProjet,
        })) || [],
      );
    }
  }, [equipe]);

  // options react-select
  const projectOptions = projets.map((projet) => ({
    value: projet.id,
    label: projet.nomProjet,
  }));


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // extraction IDs
      const projetIds = selectedProjets.map((projet) => projet.value);
      const response = await updateEquipe(equipe.id, {
        nomEquipe,
        description,
        projetIds,
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
          
          <InputForm
            label="Equipe"
            value={nomEquipe}
            onChange={(e) => setNomEquipe(e.target.value)}
            placeholder="Libellé de l'équipe"
          />

          <Textarea
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description de l'équipe"
          />

          <MultiSelectInput
            label="Projets"
            options={projectOptions}
            value={selectedProjets}
            onChange={setSelectedProjets}
            placeholder="Sélectionner un projet"
          />

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

export default EditEquipeForm;
