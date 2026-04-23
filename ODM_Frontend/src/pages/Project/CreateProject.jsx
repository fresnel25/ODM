import React, { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import Textarea from "../../components/Utils/Textarea";

const CreateProject = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-end mt-5">
      <ButtonForm onClick={() => setOpen(true)} title={"Ajouter un projet"} />

      <ModalForm
        titre={"Formulaire de création des projets"}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form action="">
          <div className="grid grid-cols-1 gap-5">
            <div className="">
              <InputForm label="Projet" placeholder="le nom du projet" />
            </div>
            <div className="">
              <Textarea
                label="Description"
                placeholder="description du projet"
              />
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateProject;
