import { useEffect, useState } from "react";
import InputForm from "../../../components/composant_formulaire/InputForm";
import { toast } from "react-toastify";
import { updateUserByAdmin } from "../../../services/api/utilisateurService";
import { getEquipes } from "../../../services/api/equipeService";
import SelectInput from "../../../components/Utils/SelectInput";
import Select from "react-select";

const EditUserFormByAdmin = ({ user, onSuccess }) => {
  const [equipes, setEquipes] = useState([]);

  const [form, setForm] = useState({
    equipeId: "",
    personnelType: "",
    grade: "",
    actif: false,
    role: "",
    matricule: "",
    loginCas: "",
  });

  //load equipes
  const loadEquipes = async () => {
    try {
      const res = await getEquipes();
      if (res.success) {
        setEquipes(res.data.content);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //pré-remplissage
  useEffect(() => {
    const init = async () => {
      await loadEquipes();
      if (user) {
        setForm({
          equipeId: user.equipe?.id ?? "",
          personnelType: user.personnelType ?? "",
          grade: user.grade ?? "",
          actif: user.actif ?? false,
          role: user.role ?? "",
          matricule: user.matricule ?? "",
          loginCas: user.loginCas ?? "",
        });
      }
    };
    init();
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const sanitizePayload = (data) => {
    return {
      ...Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          key,
          value === "" ? null : value,
        ]),
      ),
      equipeId: data.equipeId ? Number(data.equipeId) : null,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = sanitizePayload(form);
      const response = await updateUserByAdmin(user.id, payload);
      toast.success(response.message || "Utilisateur modifié");
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur modification");
    }
  };

  const roleOptions = [
    { value: "", label: "Aucun" },
    { value: "USER", label: "Utilisateur" },
    { value: "ADMIN", label: "Admin" },
    { value: "SECRETARY", label: "Secretaire" },
  ];

  const personnelTypeOptions = [
    { value: "", label: "Aucun" },
    { value: "PU", label: "PU" },
    { value: "PE", label: "PE" },
    { value: "DO", label: "DO" },
  ];

  const equipeOptions = equipes.map((e) => ({
    value: e.id,
    label: e.nomEquipe,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-5">
        <div className="grid grid-cols-1 gap-3 w-full">
          <Select
            value={equipeOptions.find((e) => e.value === form.equipeId) || null}
            onChange={(selected) =>
              setForm({
                ...form,
                equipeId: selected ? selected.value : null,
              })
            }
            options={equipeOptions}
            placeholder="Choisir une équipe"
            isClearable
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <SelectInput
            label="Rôle"
            value={form.role}
            placeholder="Choisir un rôle"
            options={roleOptions}
            onChange={(value) => setForm({ ...form, role: value })}
          />

          <SelectInput
            label="Type personnel"
            value={form.personnelType}
            placeholder="Choisir un type"
            options={personnelTypeOptions}
            onChange={(value) => setForm({ ...form, personnelType: value })}
          />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <InputForm
            label="Grade"
            name="grade"
            value={form.grade}
            onChange={handleChange}
          />

          <InputForm
            label="Matricule"
            name="matricule"
            value={form.matricule}
            onChange={handleChange}
          />
        </div>

        <InputForm
          label="Login CAS"
          name="loginCas"
          value={form.loginCas}
          onChange={handleChange}
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            name="actif"
            checked={form.actif}
            onChange={handleChange}
            className="checkbox checkbox-primary"
          />
          <span>Utilisateur actif</span>
        </div>

        <div className="flex justify-end">
          <button className="btn btn-primary" type="submit">
            Modifier
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditUserFormByAdmin;
