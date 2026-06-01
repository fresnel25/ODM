import React, { useEffect, useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import Textarea from "../../components/Utils/Textarea";
import { createEquipe } from "../../services/api/equipeService";
import { toast } from "react-toastify";
import { getProjets } from "../../services/api/projetService";
import MultiSelectInput from "../../components/Utils/MultiSelectInput";

const CreateTeam = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [nomEquipe, setNomEquipe] = useState("");

  const [projets, setProjets] = useState([]);
  const [selectedProjets, setSelectedProjets] = useState([]);
  const fetchProjets = async () => {
    try {
      const res = await getProjets({
        page: 0,
        size: 100,
      });
      if (res.success) {
        setProjets(res.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProjets();
  }, []);

  const projectOptions = projets.map((projet) => ({
    value: projet.id,
    label: projet.nomProjet,
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // extraction des IDs
      const projetIds = selectedProjets.map((projet) => projet.value);
      const response = await createEquipe({ nomEquipe, projetIds });
      setNomEquipe("");
      setSelectedProjets([]);
      setOpen(false);
      if (onSuccess) {
        onSuccess();
      }
      toast.success(response?.message);
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur création équipe");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-end mt-5">
      <ButtonForm onClick={() => setOpen(true)} title={"Ajouter une équipe"} />

      <ModalForm
        titre={"Formulaire de création des équipes"}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5">
            <div className="">
              <InputForm
                label="Nom équipe"
                placeholder="écrire le nom de l'équipe"
                value={nomEquipe}
                onChange={(e) => setNomEquipe(e.target.value)}
              />
            </div>
            <div className="">
              <Textarea
                label="Description"
                placeholder="description de l'équipe"
              />
            </div>
            <div className="">
              <MultiSelectInput
                label="Projets"
                options={projectOptions}
                value={selectedProjets}
                onChange={setSelectedProjets}
                placeholder="Sélectionner un projet"
              />
            </div>
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

export default CreateTeam;
