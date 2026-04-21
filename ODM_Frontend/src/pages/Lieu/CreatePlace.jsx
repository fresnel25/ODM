import React, { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import Textarea from "../../components/Utils/Textarea";

const CreatePlace = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-end mt-5">
      <ButtonForm onClick={() => setOpen(true)} title={"Ajouter un lieu"} />

      <ModalForm
        titre={"Formulaire de création des lieux"}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form action="">
          <div className="items-center">
            <div className="flex flex-col gap-5 justify-center w-full">
              <div className="bg-base-300 px-6 py-4">
                <InputForm label="Nom du lieu" placeholder="écrire le nom du lieu" />
              </div>
              <div className="bg-base-300 px-6 py-4">
                <Textarea
                  label="Description"
                  placeholder="description du lieu"
                />
              </div>
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreatePlace;
