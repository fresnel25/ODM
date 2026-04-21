import React, { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import Textarea from "../../components/Utils/Textarea";

const CreateMotif = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-end mt-5">
      <ButtonForm onClick={() => setOpen(true)} title={"Ajouter un motif"} />

      <ModalForm
        titre={"Formulaire de création des motifs"}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form action="">
          <div className="items-center">
            <div className="flex flex-col gap-5 justify-center w-full">
              <div className="bg-base-300 px-6 py-4">
                <InputForm label="Motif" placeholder="libellé du motif" />
              </div>
              <div className="bg-base-300 px-6 py-4">
                <Textarea
                  label="Description"
                  placeholder="description du motif"
                />
              </div>
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateMotif;
