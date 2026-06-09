import React, { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import Textarea from "../../components/Utils/Textarea";
import { toast } from "react-toastify";
import { createMotif } from "../../services/api/motifService";

const CreateMotif = ({ onSuccess }) => {
  const [open, setOpen] = useState(false);
  const [nomMotif, setNomMotif] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createMotif({ nomMotif });

      setNomMotif("");
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
      <ButtonForm onClick={() => setOpen(true)} title={"Ajouter un motif"} />

      <ModalForm
        titre={"Formulaire de création des motifs"}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5">
            <div className="">
              <InputForm
                label="Motif"
                value={nomMotif}
                onChange={(e) => setNomMotif(e.target.value)}
                placeholder="libellé du motif"
              />
            </div>
            <div className="">
              <Textarea
                label="Description"
                placeholder="description du motif"
              />
            </div>
            <div className="mt-5 flex justify-end">
              <button type="submit" className="btn btn-primary">
                Enregistrer
              </button>
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateMotif;
