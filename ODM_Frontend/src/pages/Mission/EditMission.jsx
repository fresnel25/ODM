import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import InputForm from "../../components/composant_formulaire/InputForm";
import ReactSelectInput from "../../components/Utils/ReactSelectInput";

import { missionApi } from "../../services/api/missionService";

import { getMotifs } from "../../services/api/motifService";
import { getMyEquipeProjects } from "../../services/api/projetService";

const EditMission = ({ mission, onSuccess, onClose }) => {
  const [loading, setLoading] = useState(false);

  const [motifs, setMotifs] = useState([]);
  const [projets, setProjets] = useState([]);

  const [form, setForm] = useState({
    motif: null,
    projet: null,

    transports: [],

    complementMotif: "",
    lieu: "",

    dateD: "",
    dateR: "",

    sansFrais: false,
    billetAgence: false,

    commentaireTransport: "",

    adEntiteDemandante: "",
    adAllerTrajet: "",
    adAllerPays: "",
    adRetourTrajet: "",
    adRetourPays: "",
  });

  // =========================
  // LOAD DATA
  // =========================

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

  // =========================
  // FORMAT DATE
  // =========================

  const formatDateForInput = (date) => {
    if (!date) return "";

    const d = new Date(date);

    const pad = (n) => String(n).padStart(2, "0");

    return `${d.getFullYear()}-${pad(
      d.getMonth() + 1,
    )}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  // =========================
  // OPTIONS
  // =========================

  const motifsOptions = motifs.map((m) => ({
    value: m.id,
    label: m.nomMotif,
  }));

  const projetsOptions = projets.map((p) => ({
    value: p.id,
    label: p.nomProjet,
  }));

  const transportOptions = [
    {
      value: "VP",
      label: "Véhicule Personnel",
    },

    {
      value: "VS",
      label: "Véhicule Service",
    },

    {
      value: "AVION",
      label: "Avion",
    },

    {
      value: "TRAIN",
      label: "Train",
    },

    {
      value: "TAXI",
      label: "Taxi",
    },
  ];

  // =========================
  // PREFILL FORM
  // =========================

  useEffect(() => {
    if (!mission || motifs.length === 0 || projets.length === 0) return;

    const selectedMotif = motifs.find((m) => m.id === mission.motifId);

    const selectedProjet = projets.find((p) => p.id === mission.projetId);

    setForm({
      motif: selectedMotif
        ? {
            value: selectedMotif.id,
            label: selectedMotif.nomMotif,
          }
        : null,

      projet: selectedProjet
        ? {
            value: selectedProjet.id,
            label: selectedProjet.nomProjet,
          }
        : null,

      transports:
        mission.transports?.map((t) => ({
          typeTransport: t.typeTransport
            ? {
                value: t.typeTransport,
                label:
                  transportOptions.find((o) => o.value === t.typeTransport)
                    ?.label || t.typeTransport,
              }
            : null,

          imVehicule: t.imVehicule || "",

          pfVehicule: t.pfVehicule || "",
        })) || [],

      complementMotif: mission.complementMotif || "",

      lieu: mission.lieu || "",

      dateD: formatDateForInput(mission.dateD),

      dateR: formatDateForInput(mission.dateR),

      sansFrais: mission.sansFrais ?? false,

      billetAgence: mission.billetAgence ?? false,

      commentaireTransport: mission.commentaireTransport || "",

      adEntiteDemandante: mission.adEntiteDemandante || "",

      adAllerTrajet: mission.adAllerTrajet || "",

      adAllerPays: mission.adAllerPays || "",

      adRetourTrajet: mission.adRetourTrajet || "",

      adRetourPays: mission.adRetourPays || "",
    });
  }, [mission, motifs, projets]);

  // =========================
  // HANDLE CHANGE
  // =========================

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================
  // TRANSPORTS
  // =========================

  const addTransport = () => {
    setForm((prev) => ({
      ...prev,

      transports: [
        ...prev.transports,

        {
          typeTransport: null,
          imVehicule: "",
          pfVehicule: "",
        },
      ],
    }));
  };

  const updateTransport = (index, field, value) => {
    const updated = [...form.transports];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

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

  // =========================
  // SUBMIT
  // =========================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const payload = {
        motifId: form.motif?.value,

        projetId: form.projet?.value,

        complementMotif: form.complementMotif,

        lieu: form.lieu,

        dateD: form.dateD,

        dateR: form.dateR,

        sansFrais: form.sansFrais,

        billetAgence: form.billetAgence,

        commentaireTransport: form.commentaireTransport,

        adEntiteDemandante: form.adEntiteDemandante,

        adAllerTrajet: form.adAllerTrajet,

        adAllerPays: form.adAllerPays,

        adRetourTrajet: form.adRetourTrajet,

        adRetourPays: form.adRetourPays,

        transports: form.transports.map((t) => ({
          typeTransport: t.typeTransport?.value,

          imVehicule: t.imVehicule,

          pfVehicule: t.pfVehicule,
        })),
      };

      console.log(payload);

      const response = await missionApi.update(mission.id, payload);

      toast.success(response.message || "Mission modifiée avec succès");

      onSuccess?.();

      onClose?.();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message || "Erreur modification mission",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        {/* SELECTS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <ReactSelectInput
            label="Motif"
            value={form.motif}
            options={motifsOptions}
            placeholder="Choisir un motif"
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                motif: value,
              }))
            }
          />

          <ReactSelectInput
            label="Projet"
            value={form.projet}
            options={projetsOptions}
            placeholder="Choisir un projet"
            onChange={(value) =>
              setForm((prev) => ({
                ...prev,
                projet: value,
              }))
            }
          />
        </div>

        {/* INFOS */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        {/* DATES */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        {/* TRANSPORTS */}

        <div className="border border-base-300 rounded-2xl p-5 flex flex-col gap-5">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-lg">Transports</h2>

            <button
              type="button"
              className="btn btn-sm btn-primary"
              onClick={addTransport}
            >
              Ajouter
            </button>
          </div>

          {form.transports.length === 0 && (
            <p className="text-sm text-gray-400">Aucun transport ajouté</p>
          )}

          {form.transports.map((transport, index) => (
            <div
              key={index}
              className="border border-base-300 rounded-xl p-4 flex flex-col gap-4"
            >
              <ReactSelectInput
                label="Type transport"
                value={transport.typeTransport}
                options={transportOptions}
                placeholder="Choisir un transport"
                onChange={(value) =>
                  updateTransport(index, "typeTransport", value)
                }
              />

              {transport.typeTransport?.value === "VS" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        {/* COMMENTAIRE */}

        <InputForm
          label="Commentaire transport"
          name="commentaireTransport"
          value={form.commentaireTransport}
          onChange={handleChange}
        />

        {/* ADRESSES */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

        {/* CHECKBOX */}

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

        {/* BUTTON */}

        <div className="flex justify-end">
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Modification..." : "Modifier Mission"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default EditMission;
