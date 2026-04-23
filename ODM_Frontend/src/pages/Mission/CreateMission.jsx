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
          <div className="flex flex-col gap-5">
            {/*  */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="">
                <SelectInput
                  label={"Projet Associé"}
                  placeholder="Sélectionner le projet"
                />
              </div>
              <div className="">
                <SelectInput
                  label={"Motif"}
                  placeholder="Sélectionner le motif"
                />
              </div>
            </div>

            {/*  */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="">
                <InputForm
                  label="Unité de recherche / Service"
                  placeholder=" votre Unité de recherche / Service"
                />
              </div>
              <div className="">
                <SelectInput label={"Lieu"} placeholder="Choisir un lieu" />
              </div>
            </div>

            {/*  */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="">
                <InputForm
                  label="Date et Heure de départ"
                  placeholder="votre date et heure de départ"
                />
              </div>
              <div className="">
                <InputForm
                  label="Date et Heure de retour"
                  placeholder="votre date et heure de retour"
                />
              </div>
            </div>

            {/*  */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="">
                <InputForm label="Aller (Trajet)" placeholder="votre trajet" />
              </div>
              <div className="">
                <InputForm label="Retour (Trajet)" placeholder="votre trajet" />
              </div>
            </div>

            {/*  */}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <div className="">
                <SelectInput
                  label={"Transport"}
                  placeholder="Sélectionner un moyen de transport"
                />
              </div>
              <div className="">
                <SelectInput
                  label={"Autres Passagers"}
                  placeholder="Sélectionner un passager"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {/* Textarea (prend toute la largeur) */}
              <div className="xl:col-span-2 ">
                <Textarea
                  label="Informations complémentaires sur le transport"
                  className=""
                />
              </div>

              {/* Inputs */}
              <InputForm
                label="Immatriculation vehicule"
                placeholder="votre immatriculation"
                className=""
              />

              <InputForm
                label="Puissance fiscale vehicule"
                placeholder="votre puissance fiscale"
                className=""
              />
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateMission;
