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
          <div className="flex flex-col gap-5 ">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <InputForm label="Nom" placeholder=" votre nom" />
              <InputForm label="Prénom" placeholder=" votre prénom" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <InputForm label="Courriel" placeholder=" votre courriel" />
              <InputForm label="Date de naissance" placeholder=" votre nom" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              <InputForm
                label="mot de passe"
                placeholder="votre mot de passe"
              />
              <InputForm
                label="Confirmation"
                placeholder="confirmer votre mot de passe"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
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
        </form>
      </ModalForm>
    </div>
  );
};

export default CreateUser;
