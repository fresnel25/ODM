import { useState } from "react";
import ModalForm from "../../components/Utils/ModalForm";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import InputForm from "../../components/composant_formulaire/InputForm";

const CreateUser = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-end mt-5">
        <ButtonForm
          onClick={() => setOpen(true)}
          title={"Ajouter un utilisateur"}
        />
      </div>

      <ModalForm
        titre={"Formulaire de création des utilisateurs"}
        isOpen={open}
        onClose={() => setOpen(false)}
      >
        <form action="">
          <div className="flex flex-col gap-10">
            <div className="bg-base-300 px-6 py-4 flex flex-col items-center">
              <div className="flex gap-5 justify-center w-full">
                <InputForm label="Nom" placeholder=" votre nom" />
                <InputForm label="Prénom" placeholder=" votre prénom" />
              </div>

              <div className="flex gap-5 justify-center w-full">
                <InputForm label="Courriel" placeholder=" votre courriel" />
                <InputForm label="Date de naissance" placeholder=" votre nom" />
              </div>
            </div>

            <div className="bg-base-300 px-6 py-4 items-center">
              <div className="flex gap-5 justify-center w-full">
                <InputForm
                  label="mot de passe"
                  placeholder="votre mot de passe"
                />
                <InputForm
                  label="Confirmation"
                  placeholder="confirmer votre mot de passe"
                />
              </div>
            </div>

            <div className="bg-base-300 px-6 py-4 items-center">
              <div className="flex gap-5 justify-center w-full">
                <InputForm
                  label="Adresse Personnelle"
                  placeholder="votre adresse personnelle
"
                />
                <InputForm
                  label="Résidence Administative"
                  placeholder="résidence administative"
                />
              </div>
            </div>
          </div>
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateUser;
