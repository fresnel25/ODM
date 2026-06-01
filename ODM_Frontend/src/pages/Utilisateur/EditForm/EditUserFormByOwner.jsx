import { useEffect, useState } from "react";
import InputForm from "../../../components/composant_formulaire/InputForm";
import { toast } from "react-toastify";
import { updateUserByOwner } from "../../../services/api/utilisateurService";

const EditUserFormByOwner = ({ user, onSuccess }) => {
  const [form, setForm] = useState({
    firstName: "",
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    equipeId: "",
    personnelType: "",
    grade: "",
    dateNaissance: "",
    imVehicule: "",
    pfVehicule: "",
    signatureName: "",
    residenceAdmin2: "",
    adresseAgent1: "",
  });

  // Pré-remplissage
  useEffect(() => {
    if (user) {
      setForm({
        firstName: user.firstName || "",
        name: user.name || "",
        email: user.email || "",
        password: "",
        confirmPassword: "",
        equipeId: user.equipeId || "",
        personnelType: user.personnelType || "",
        grade: user.grade || "",
        dateNaissance: user.dateNaissance || "",
        imVehicule: user.imVehicule || "",
        pfVehicule: user.pfVehicule || "",
        signatureName: user.signatureName || "",
        residenceAdmin2: user.residenceAdmin2 || "",
        adresseAgent1: user.adresseAgent1 || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const sanitizePayload = (data) => {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        value === "" ? null : value,
      ]),
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const payload = sanitizePayload(form);
      const response = await updateUserByOwner(user.id, payload);
      toast.success(response.message || "Profil mis à jour");
      onSuccess?.();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Erreur lors de la modification",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        {/* NOM + PRENOM */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <InputForm
            label="Nom"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Votre nom"
          />

          <InputForm
            label="Prénom"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            placeholder="Votre prénom"
          />
        </div>

        {/* EMAIL + DATE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <InputForm
            label="Courriel"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Votre email"
          />

          <InputForm
            label="Date de naissance"
            name="dateNaissance"
            type="date"
            value={form.dateNaissance}
            onChange={handleChange}
          />
        </div>

        {/* PASSWORD */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <InputForm
            label="Mot de passe"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Nouveau mot de passe"
          />

          <InputForm
            label="Confirmation"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirmer le mot de passe"
          />
        </div>

        {/* GRADE + TYPE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <InputForm
            label="Grade"
            name="grade"
            value={form.grade}
            onChange={handleChange}
            placeholder="Votre grade"
          />

          <InputForm
            label="Type personnel"
            name="personnelType"
            value={form.personnelType}
            onChange={handleChange}
            placeholder="Type personnel"
          />
        </div>

        {/* VEHICULE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <InputForm
            label="IM Véhicule"
            name="imVehicule"
            value={form.imVehicule}
            onChange={handleChange}
            placeholder="IM véhicule"
          />

          <InputForm
            label="PF Véhicule"
            name="pfVehicule"
            type="number"
            value={form.pfVehicule}
            onChange={handleChange}
            placeholder="PF véhicule"
          />
        </div>

        {/* SIGNATURE */}
        <InputForm
          label="Nom Signature"
          name="signatureName"
          value={form.signatureName}
          onChange={handleChange}
          placeholder="Nom signature"
        />

        {/* ADRESSE */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <InputForm
            label="Résidence Administrative"
            name="residenceAdmin2"
            value={form.residenceAdmin2}
            onChange={handleChange}
            placeholder="Résidence administrative"
          />

          <InputForm
            label="Adresse Agent"
            name="adresseAgent1"
            value={form.adresseAgent1}
            onChange={handleChange}
            placeholder="Adresse agent"
          />
        </div>

        {/* BUTTON */}
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Modifier mon profil
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserFormByOwner;
