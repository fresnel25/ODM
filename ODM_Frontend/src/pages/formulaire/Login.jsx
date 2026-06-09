import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import ImageForm from "../../components/composant_formulaire/ImageForm";
import TitleForm from "../../components/composant_formulaire/TitleForm";
import image1 from "../../../public/assets/favicon.ico";
import { useState } from "react";
import { useAuth } from "../../services/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import BtnTheme from "../../components/Utils/BtnTheme";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleCasLogin = () => {
    navigate(`${import.meta.env.VITE_AUTH_URL}/cas/login`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      toast.success("Connexion réussie");
      console.log("Connexion réussie");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Erreur de connexion");
      console.log(err.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="">
        <BtnTheme />
      </div>
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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <InputForm
              type="email"
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
            <div className="flex flex-col justify-between items-center gap-5 p-4">
              <div className="flex gap-5">
                <ButtonForm title="Connexion" />

                <ButtonForm
                  type="button"
                  onClick={handleCasLogin}
                  title="Connexion CAS"
                />
              </div>

              <div>
                <button
                  type="button"
                  className="text-sm text-primary hover:underline"
                  onClick={() => navigate("/register")}
                >
                  Pas de compte ? Créer un compte
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
