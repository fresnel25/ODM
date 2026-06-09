import { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import InputForm from "../../components/composant_formulaire/InputForm";
import ImageForm from "../../components/composant_formulaire/ImageForm";
import TitleForm from "../../components/composant_formulaire/TitleForm";
import image1 from "../../../public/assets/favicon.ico";
import { toast } from "react-toastify";
import { registerUser } from "../../services/api/utilisateurService";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    name: "",
    email: "",
    password: "",
    dateNaissance: "",
    residenceAdmin2: "",
    adresseAgent1: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(formData);
      toast.success(response.message);
      console.log(response.data);
      // reset formulaire
      setFormData({
        firstName: "",
        name: "",
        email: "",
        password: "",
        dateNaissance: "",
        residenceAdmin2: "",
        adresseAgent1: "",
      });
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de l'inscription",
      );
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-5">
      <div className="card w-full max-w-7xl card-side bg-base-100 shadow-2xl rounded-2xl overflow-hidden">
        {/* IMAGE */}
        <div className="hidden xl:flex flex-col justify-center items-center bg-base-100 w-[35%] p-10 gap-10">
          <div className="flex flex-col items-center gap-2 font-bold">
            <h2 className="text-4xl text-black">Bienvenue sur</h2>

            <h3 className="text-2xl text-emerald-900">
              Environ<span className="text-accent">_Data</span>
            </h3>
          </div>

          <figure>
            <ImageForm src={image1} />
          </figure>
        </div>

        <div className="card-body p-8">
          <TitleForm title={"Inscription"} />

          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 xl:grid-cols-2 gap-5"
          >
            <InputForm
              label="Prénom"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Entrer votre prénom"
            />

            <InputForm
              label="Nom"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Entrer votre nom"
            />

            <InputForm
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Entrer votre email"
            />

            <InputForm
              label="Mot de passe"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Entrer votre mot de passe"
            />

            <InputForm
              label="Date de naissance"
              type="date"
              name="dateNaissance"
              value={formData.dateNaissance}
              onChange={handleChange}
            />

            <InputForm
              label="Résidence administrative"
              name="residenceAdmin2"
              value={formData.residenceAdmin2}
              onChange={handleChange}
              placeholder="Entrer votre résidence administrative"
            />

            <InputForm
              label="Adresse personnelle"
              name="adresseAgent1"
              value={formData.adresseAgent1}
              onChange={handleChange}
              placeholder="Entrer votre adresse personnelle"
            />

            <div className="xl:col-span-2 flex justify-end mt-5">
              <button
                type="submit"
                className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Inscription"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
