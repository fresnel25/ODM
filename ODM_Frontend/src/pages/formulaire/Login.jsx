import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import ImageForm from "../../components/composant_formulaire/ImageForm";
import TitleForm from "../../components/composant_formulaire/TitleForm";
import image1 from "../../../public/assets/img-tour.svg";
import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="card card-xl min-h-[500px] card-border card-side shadow-xl rounded-xl overflow-hidden p-0 gap-15">
        {/* Colonne image */}
        <div className="flex flex-col gap-17 p-0 m-0 justify-center w-90 form-custom">
          <div className="px-4 pt-4 flex flex-col gap-2 items-center font-bold">
            <h2 className="text-4xl text-base-content">Bienvenue sur</h2>
            <h3 className="text-2xl text-primary">ODM</h3>
          </div>
          <figure>
            <ImageForm src={image1} />
          </figure>
        </div>

        {/* Colonne formulaire */}
        <div className="card-body p-5 m-0 flex flex-col gap-7 justify-center">
          <TitleForm title={"Connexion"} />
          <form className="flex flex-col gap-4">
            <InputForm
              label="Email"
              placeholder="Entrer votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputForm
              label="Mot de Passe"
              placeholder="Entrer votre mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end p-4">
              <ButtonForm title="Connexion" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
