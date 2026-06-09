import React, { useEffect, useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import Textarea from "../../components/Utils/Textarea";
import MultiSelectInput from "../../components/Utils/MultiSelectInput";
import { toast } from "react-toastify";
import { createProjet } from "../../services/api/projetService";
import { getEquipes } from "../../services/api/equipeService";

const CreateProject = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);

  const [nomProjet, setNomProjet] = useState("");
  const [description, setDescription] = useState("");
  const [equipes, setEquipes] = useState([]);
  const [selectedEquipes, setSelectedEquipes] = useState([]);

  useEffect(() => {
    loadEquipes();
  }, []);

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

    try {
      const payload = {
        nomProjet,
        description,
        equipeIds: selectedEquipes.map((equipe) => equipe.value),
      };

      const response = await createProjet(payload);

      setNomProjet("");
      setDescription("");
      setSelectedEquipes([]);
      setOpen(false);

      onSuccess?.();

      toast.success(response?.message || "Projet créé");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la création",
      );
      console.error(error);
    }
  };

  return (
    <div className="flex justify-end mt-5">
      <ButtonForm onClick={() => setOpen(true)} title="Ajouter un projet" />

      <ModalForm
        titre="Formulaire de création des projets"
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5">
            <InputForm
              label="Projet"
              placeholder="Le nom du projet"
              value={nomProjet}
              onChange={(e) => setNomProjet(e.target.value)}
            />

            <Textarea
              label="Description"
              placeholder="Description du projet"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <MultiSelectInput
              label="Équipes associées"
              options={equipeOptions}
              value={selectedEquipes}
              onChange={(selected) => setSelectedEquipes(selected || [])}
              placeholder="Sélectionner une ou plusieurs équipes"
            />

            <div className="mt-5 flex justify-end">
              <button type="submit" className="btn btn-success btn-soft btn-sm">
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateProject;
