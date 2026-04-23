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
          <div className="grid grid-cols-1 gap-5">
            <div className="">
              <InputForm label="Motif" placeholder="libellé du motif" />
            </div>
            <div className="">
              <Textarea
                label="Description"
                placeholder="description du motif"
              />
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateMotif;
