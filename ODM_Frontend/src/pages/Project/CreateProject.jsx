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
          <div className="items-center">
            <div className="flex flex-col gap-5 justify-center w-full">
              <div className="bg-base-300 px-6 py-4">
                <InputForm label="Projet" placeholder="le nom du projet" />
              </div>
              <div className="bg-base-300 px-6 py-4">
                <Textarea
                  label="Description"
                  placeholder="description du projet"
                />
              </div>
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateProject;
