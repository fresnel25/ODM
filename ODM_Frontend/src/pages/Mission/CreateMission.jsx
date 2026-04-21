import React, { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import Textarea from "../../components/Utils/Textarea";

const CreateMission = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-end mt-5">
      <ButtonForm onClick={() => setOpen(true)} title={"Ajouter une mission"} />

      <ModalForm
        titre={"Formulaire de création des missions"}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form action="">
          <div className="flex flex-col gap-10">
            {/*  */}
            <div className="flex flex-col items-center gap-10 ">
              <div className="flex gap-5 justify-center w-full">
                <div className="bg-base-300 px-6 py-4">
                  <SelectInput
                    label={"Projet Associé"}
                    placeholder="Sélectionner le projet"
                  />
                </div>
                <div className="bg-base-300 px-6 py-4">
                  <SelectInput
                    label={"Motif"}
                    placeholder="Sélectionner le motif"
                  />
                </div>
              </div>

              <div className="flex gap-5 justify-center w-full">
                <div className="bg-base-300 px-6 py-4">
                  <InputForm
                    label="Unité de recherche / Composante / Service"
                    placeholder=" votre Unité de recherche / Composante / Service"
                  />
                </div>
                <div className="bg-base-300 px-6 py-4">
                  <SelectInput label={"Lieu"} placeholder="Choisir un lieu" />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col items-center">
              <div className="flex justify-center w-full">
                <div className="bg-base-300 px-6 py-4">
                  <InputForm
                    label="Date et Heure de départ"
                    placeholder="votre date et heure de départ"
                  />
                </div>
                <div className="bg-base-300 px-6 py-4">
                  <InputForm
                    label="Date et Heure de retour"
                    placeholder="votre date et heure de retour"
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col items-center">
              <div className="flex justify-center w-full">
                <div className="bg-base-300 px-6 py-4">
                  <InputForm
                    label="Aller (Trajet)"
                    placeholder="votre trajet"
                  />
                </div>
                <div className="bg-base-300 px-6 py-4">
                  <InputForm
                    label="Retour (Trajet)"
                    placeholder="votre trajet"
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col items-center">
              <div className="flex gap-5 justify-center w-full">
                <div className="bg-base-300 px-6 py-4">
                  <SelectInput
                    label={"Transport"}
                    placeholder="Sélectionner un moyen de transport"
                  />
                </div>
                <div className="bg-base-300 px-6 py-4">
                  <SelectInput
                    label={"Autres Passagers"}
                    placeholder="Sélectionner un passager"
                  />
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col items-center">
              <div className="justify-center w-full">
                <div className="bg-base-300 px-6 py-4">
                 <Textarea label={"Informations complémentaires sur le transport"}/>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="flex flex-col items-center">
              <div className="flex justify-center w-full">
                <div className="bg-base-300 px-6 py-4">
                  <InputForm
                    label="Immatriculation vehicule"
                    placeholder="votre immatriculation"
                  />
                </div>
                <div className="bg-base-300 px-6 py-4">
                  <InputForm
                    label="Puissance fiscale vehicule"
                    placeholder="votre puissance fiscale"
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateMission;
