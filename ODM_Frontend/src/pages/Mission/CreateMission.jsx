import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import ModalForm from "../../components/Utils/ModalForm";

import { missionApi } from "../../services/api/missionService";
import { getMotifs } from "../../services/api/motifService";
import { getMyEquipeProjects } from "../../services/api/projetService";
import { mapToOptions } from "../../common/utils/options";

const CreateMission = ({ onSuccess }) => {
  const [motifs, setMotifs] = useState([]);
  const [projets, setProjets] = useState([]);

  const [form, setForm] = useState({
    motifId: "",
    projetId: "",
    transports: [],
    complementMotif: "",
    lieu: "",
    dateD: "",
    dateR: "",
    sansFrais: false,
    billetAgence: false,
    etat: "SOUMIS",
    commentaireTransport: "",
    adEntiteDemandante: "",
    adAllerTrajet: "",
    adAllerPays: "",
    adRetourTrajet: "",
    adRetourPays: "",
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [motifsRes, projetsRes] = await Promise.all([
        getMotifs(),
        getMyEquipeProjects(),
      ]);
      if (motifsRes.success) {
        setMotifs(motifsRes.data.content || motifsRes.data);
      }
      if (projetsRes.success) {
        setProjets(projetsRes.data.content || projetsRes.data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur chargement données");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addTransport = () => {
    setForm((prev) => ({
      ...prev,
      transports: [
        ...prev.transports,
        {
          typeTransport: "",
          imVehicule: "",
          pfVehicule: "",
        },
      ],
    }));
  };

  const updateTransport = (index, field, value) => {
    const updated = [...form.transports];
    updated[index][field] = value;
    setForm((prev) => ({
      ...prev,
      transports: updated,
    }));
  };

  const removeTransport = (index) => {
    setForm((prev) => ({
      ...prev,
      transports: prev.transports.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        motifId: Number(form.motifId),
        projetId: Number(form.projetId),
      };
      const response = await missionApi.create(payload);
      toast.success(response.message || "Mission créée");
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "Erreur création mission");
    }
  };

const projetsOptions = mapToOptions(projets, "nomProjet");
const motifsOptions = mapToOptions(motifs, "nomMotif");

  const transportOptions = [
    { value: "VP", label: "Véhicule Personnel" },
    { value: "VS", label: "Véhicule Service" },
    { value: "AVION", label: "Avion" },
    { value: "TRAIN", label: "Train" },
    { value: "TAXI", label: "Taxi" },
  ];

  return (
    <div className="flex justify-end mt-5">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <SelectInput
              label="Motif"
              value={form.motifId}
              options={motifsOptions}
              placeholder="Choisir un motif"
              onChange={(value) => setForm({ ...form, motifId: value })}
            />

            <SelectInput
              label="Projet"
              value={form.projetId}
              options={projetsOptions}
              placeholder="Choisir un projet"
              onChange={(value) => setForm({ ...form, projetId: value })}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <InputForm
              label="Lieu"
              name="lieu"
              value={form.lieu}
              onChange={handleChange}
            />

            <InputForm
              label="Complément motif"
              name="complementMotif"
              value={form.complementMotif}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <InputForm
              type="datetime-local"
              label="Date départ"
              name="dateD"
              value={form.dateD}
              onChange={handleChange}
            />

            <InputForm
              type="datetime-local"
              label="Date retour"
              name="dateR"
              value={form.dateR}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-4 border rounded-xl p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg">Transports</h3>

              <button
                type="button"
                className="btn btn-sm btn-primary"
                onClick={addTransport}
              >
                Ajouter
              </button>
            </div>

            {form.transports.map((transport, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 flex flex-col gap-4"
              >
                <SelectInput
                  label="Type transport"
                  value={transport.typeTransport}
                  options={transportOptions}
                  placeholder="Choisir un transport"
                  onChange={(value) =>
                    updateTransport(index, "typeTransport", value)
                  }
                />

                {transport.typeTransport === "VS" && (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    <InputForm
                      label="Immatriculation"
                      value={transport.imVehicule}
                      onChange={(e) =>
                        updateTransport(index, "imVehicule", e.target.value)
                      }
                    />

                    <InputForm
                      label="Puissance fiscale"
                      value={transport.pfVehicule}
                      onChange={(e) =>
                        updateTransport(index, "pfVehicule", e.target.value)
                      }
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  <button
                    type="button"
                    className="btn btn-error btn-sm"
                    onClick={() => removeTransport(index)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>

          <InputForm
            label="Commentaire transport"
            name="commentaireTransport"
            value={form.commentaireTransport}
            onChange={handleChange}
          />

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <InputForm
              label="Entité demandante"
              name="adEntiteDemandante"
              value={form.adEntiteDemandante}
              onChange={handleChange}
            />

            <InputForm
              label="Trajet Aller"
              name="adAllerTrajet"
              value={form.adAllerTrajet}
              onChange={handleChange}
            />

            <InputForm
              label="Pays Aller"
              name="adAllerPays"
              value={form.adAllerPays}
              onChange={handleChange}
            />

            <InputForm
              label="Trajet Retour"
              name="adRetourTrajet"
              value={form.adRetourTrajet}
              onChange={handleChange}
            />

            <InputForm
              label="Pays Retour"
              name="adRetourPays"
              value={form.adRetourPays}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="sansFrais"
                checked={form.sansFrais}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <span>Sans frais</span>
            </label>

            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="billetAgence"
                checked={form.billetAgence}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
              <span>Billet agence</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button className="btn btn-primary" type="submit">
              Créer Mission
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateMission;
