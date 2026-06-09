import { useEffect, useState } from "react";
import InputForm from "../../components/composant_formulaire/InputForm";
import Textarea from "../../components/Utils/Textarea";
import MultiSelectInput from "../../components/Utils/MultiSelectInput";
import { getProjets } from "../../services/api/projetService";

const EquipeForm = ({
  initialData = {},
  submitLabel = "Enregistrer",
  onSubmit,
  loading = false,
}) => {
  const [nomEquipe, setNomEquipe] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProjets, setSelectedProjets] = useState([]);
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    fetchProjets();
  }, []);

  useEffect(() => {
    if (!initialData) return;

    setNomEquipe(initialData.nomEquipe || "");
    setDescription(initialData.description || "");

    const projetsInitial =
      initialData.projets?.map((projet) => ({
        value: projet.id,
        label: projet.nomProjet,
      })) || [];

    setSelectedProjets(projetsInitial);
  }, [initialData]);

  const fetchProjets = async () => {
    try {
      const res = await getProjets({
        page: 0,
        size: 100,
      });

      if (res.success) {
        setProjets(res.data.content || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const projetOptions = projets.map((projet) => ({
    value: projet.id,
    label: projet.nomProjet,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      nomEquipe,
      description,
      projetIds: selectedProjets.map((projet) => projet.value),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-5">
        <InputForm
          label="Nom équipe"
          value={nomEquipe}
          onChange={(e) => setNomEquipe(e.target.value)}
          placeholder="Nom équipe"
        />

        <Textarea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <MultiSelectInput
          label="Projets associés"
          options={projetOptions}
          value={selectedProjets}
          onChange={(selectedOptions) =>
            setSelectedProjets(selectedOptions || [])
          }
          placeholder="Sélectionner un ou plusieurs projets"
        />

        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              submitLabel
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EquipeForm;
