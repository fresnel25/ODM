import { useEffect, useMemo, useState } from "react";
import InputForm from "../../components/composant_formulaire/InputForm";
import Textarea from "../../components/Utils/Textarea";
import MultiSelectInput from "../../components/Utils/MultiSelectInput";
import { getProjets } from "../../services/api/projetService";

const EquipeForm = ({
  initialData = null,
  submitLabel = "Enregistrer",
  onSubmit,
  loading = false,
}) => {
  const [nomEquipe, setNomEquipe] = useState("");
  const [description, setDescription] = useState("");
  const [selectedProjets, setSelectedProjets] = useState([]);
  const [projets, setProjets] = useState([]);

  useEffect(() => {
    const fetchProjets = async () => {
      try {
        const res = await getProjets({
          page: 0,
          size: 100,
        });

        if (res.success) {
          setProjets(res.data?.content || []);
        }
      } catch (error) {
        console.error("Erreur chargement projets :", error);
      }
    };

    fetchProjets();
  }, []);

  useEffect(() => {
    if (!initialData) {
      setNomEquipe("");
      setDescription("");
      setSelectedProjets([]);
      return;
    }

    setNomEquipe(initialData.nomEquipe || "");
    setDescription(initialData.description || "");

    const projetsInitial =
      initialData.projets?.map((projet) => ({
        value: projet.id,
        label: projet.nomProjet,
      })) || [];

    setSelectedProjets(projetsInitial);
  }, [initialData]);

  const projetOptions = useMemo(
    () =>
      projets.map((projet) => ({
        value: projet.id,
        label: projet.nomProjet,
      })),
    [projets],
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({
      nomEquipe: nomEquipe.trim(),
      description: description.trim(),
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
