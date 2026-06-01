import React, { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import Textarea from "../../components/Utils/Textarea";
import { toast } from "react-toastify";
import { createProjet } from "../../services/api/projetService";

const CreateProject = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [nomProjet, setnomProjet] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createProjet({ nomProjet });

      setnomProjet("");
      setOpen(false);

      if (onSuccess) onSuccess();

      toast.success(response?.message);
      console.log(response?.message);
      console.log(response?.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };
  return (
    <div className="flex justify-end mt-5">
      <ButtonForm onClick={() => setOpen(true)} title={"Ajouter un projet"} />

      <ModalForm
        titre={"Formulaire de création des projets"}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5">
            <div className="">
              <InputForm
                label="Projet"
                placeholder="le nom du projet"
                value={nomProjet}
                onChange={(e) => setnomProjet(e.target.value)}
              />
            </div>
            <div className="">
              <Textarea
                label="Description"
                placeholder="description du projet"
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

export default CreateProject;
