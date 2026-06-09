import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import InputForm from "../../components/composant_formulaire/InputForm";
import SelectInput from "../../components/Utils/SelectInput";
import LocationInput from "./LocationInput";

import { getMotifs } from "../../services/api/motifService";
import { getMyEquipeProjects } from "../../services/api/projetService";
import { missionApi } from "../../services/api/missionService";
import { mapToOptions } from "../../common/utils/options";

const emptyTransport = {
  typeTransport: "",
  adresseDepart: null,
  adresseArrivee: null,
  imVehicule: "",
  pfVehicule: "",
};

const CreateMission = ({ onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const [motifs, setMotifs] = useState([]);
  const [projets, setProjets] = useState([]);

  const [form, setForm] = useState({
    motifId: "",
    projetId: "",
    lieu: "",
    complementMotif: "",
    dateD: "",
    dateR: "",
    sansFrais: false,
    billetAgence: false,
    transports: [{ ...emptyTransport }],
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        const [m, p] = await Promise.all([getMotifs(), getMyEquipeProjects()]);

        setMotifs(m.data.content || m.data);
        setProjets(p.data.content || p.data);
      } catch (error) {
        console.error(error);
        toast.error("Erreur chargement des données");
      }
    };

    loadData();
  }, []);

  const transportOptions = [
    { value: "VP", label: "Véhicule personnel" },
    { value: "VS", label: "Véhicule de service" },
    { value: "TRAIN", label: "Train" },
    { value: "AVION", label: "Avion" },
  ];

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
      transports: [...prev.transports, { ...emptyTransport }],
    }));
  };

  const updateTransport = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      transports: prev.transports.map((transport, i) =>
        i === index
          ? {
              ...transport,
              [field]: value,
            }
          : transport,
      ),
    }));
  };

  const removeTransport = (index) => {
    setForm((prev) => ({
      ...prev,
      transports:
        prev.transports.length > 1
          ? prev.transports.filter((_, i) => i !== index)
          : [{ ...emptyTransport }],
    }));
  };

  const buildPayload = () => {
    return {
      motifId: form.motifId ? Number(form.motifId) : null,
      projetId: form.projetId ? Number(form.projetId) : null,

      lieu: form.lieu,
      complementMotif: form.complementMotif,

      dateD: form.dateD,
      dateR: form.dateR,

      sansFrais: form.sansFrais,
      billetAgence: form.billetAgence,

      transports: form.transports.map((t) => ({
        typeTransport: t.typeTransport,

        adresseDepart: t.adresseDepart?.name ?? "",
        paysDepart: t.adresseDepart?.country ?? "",
        latitudeDepart: t.adresseDepart?.latitude ?? null,
        longitudeDepart: t.adresseDepart?.longitude ?? null,

        adresseArrivee: t.adresseArrivee?.name ?? "",
        paysArrivee: t.adresseArrivee?.country ?? "",
        latitudeArrivee: t.adresseArrivee?.latitude ?? null,
        longitudeArrivee: t.adresseArrivee?.longitude ?? null,

        // VS uniquement : l'utilisateur saisit
        // VP : backend prend depuis le profil utilisateur
        // TRAIN / AVION : null
        imVehicule: t.typeTransport === "VS" ? t.imVehicule || null : null,
        pfVehicule:
          t.typeTransport === "VS" && t.pfVehicule
            ? Number(t.pfVehicule)
            : null,
      })),
    };
  };

  const validateForm = () => {
    if (!form.motifId) {
      toast.error("Veuillez choisir un motif");
      return false;
    }

    if (!form.projetId) {
      toast.error("Veuillez choisir un projet");
      return false;
    }

    if (!form.lieu?.trim()) {
      toast.error("Veuillez renseigner le lieu");
      return false;
    }

    if (!form.dateD || !form.dateR) {
      toast.error("Veuillez renseigner les dates");
      return false;
    }

    if (new Date(form.dateR) < new Date(form.dateD)) {
      toast.error("La date de retour doit être après la date de départ");
      return false;
    }

    for (const transport of form.transports) {
      if (!transport.typeTransport) {
        toast.error("Veuillez choisir un type de déplacement");
        return false;
      }

      if (!transport.adresseDepart?.name || !transport.adresseArrivee?.name) {
        toast.error("Veuillez renseigner les adresses de départ et d’arrivée");
        return false;
      }

      if (
        transport.adresseDepart?.latitude == null ||
        transport.adresseDepart?.longitude == null ||
        transport.adresseArrivee?.latitude == null ||
        transport.adresseArrivee?.longitude == null
      ) {
        toast.error("Les coordonnées GPS sont obligatoires");
        return false;
      }

      if (transport.typeTransport === "VS") {
        if (!transport.imVehicule?.trim() || !transport.pfVehicule) {
          toast.error(
            "Veuillez renseigner l’immatriculation et la puissance fiscale du véhicule de service",
          );
          return false;
        }
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);

      await missionApi.create(buildPayload());

      toast.success("Mission créée");
      onSuccess?.();

      setForm({
        motifId: "",
        projetId: "",
        lieu: "",
        complementMotif: "",
        dateD: "",
        dateR: "",
        sansFrais: false,
        billetAgence: false,
        transports: [{ ...emptyTransport }],
      });
    } catch (error) {
      console.error(error);
      toast.error("Erreur création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center">
      <form
        className="w-full max-w-5xl flex flex-col gap-6"
        onSubmit={handleSubmit}
      >
        {/* ================= GENERAL ================= */}
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h2 className="text-xl font-bold">Créer une mission</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <SelectInput
                label="Motif"
                value={form.motifId}
                options={mapToOptions(motifs, "nomMotif")}
                placeholder="Choisir un motif"
                onChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    motifId: v ? Number(v) : "",
                  }))
                }
              />

              <SelectInput
                label="Projet"
                value={form.projetId}
                options={mapToOptions(projets, "nomProjet")}
                placeholder="Choisir un projet"
                onChange={(v) =>
                  setForm((prev) => ({
                    ...prev,
                    projetId: v ? Number(v) : "",
                  }))
                }
              />

              <InputForm
                label="Lieu"
                name="lieu"
                value={form.lieu}
                onChange={handleChange}
              />

              <InputForm
                label="Complément"
                name="complementMotif"
                value={form.complementMotif}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* ================= DATES ================= */}
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h2 className="text-xl font-bold">Période</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          </div>
        </div>

        {/* ================= TRANSPORTS ================= */}
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Déplacements</h2>

              <button
                type="button"
                onClick={addTransport}
                className="btn btn-primary btn-sm"
              >
                + Ajouter
              </button>
            </div>

            {form.transports.map((t, index) => (
              <div
                key={index}
                className="border rounded-xl p-4 flex flex-col gap-3"
              >
                <SelectInput
                  label="Type de déplacement"
                  value={t.typeTransport}
                  options={transportOptions}
                  placeholder="Choisir un transport"
                  onChange={(v) => {
                    updateTransport(index, "typeTransport", v || "");

                    if (v !== "VS") {
                      updateTransport(index, "imVehicule", "");
                      updateTransport(index, "pfVehicule", "");
                    }
                  }}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <LocationInput
                    label="Départ"
                    value={t.adresseDepart?.name || ""}
                    onSelect={(location) =>
                      updateTransport(index, "adresseDepart", {
                        name: location.adresse,
                        country: location.pays,
                        latitude: location.latitude,
                        longitude: location.longitude,
                      })
                    }
                  />

                  <LocationInput
                    label="Arrivée"
                    value={t.adresseArrivee?.name || ""}
                    onSelect={(location) =>
                      updateTransport(index, "adresseArrivee", {
                        name: location.adresse,
                        country: location.pays,
                        latitude: location.latitude,
                        longitude: location.longitude,
                      })
                    }
                  />
                </div>

                {t.typeTransport === "VS" && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <InputForm
                      label="Immatriculation"
                      value={t.imVehicule}
                      onChange={(e) =>
                        updateTransport(index, "imVehicule", e.target.value)
                      }
                    />

                    <InputForm
                      type="number"
                      label="Puissance fiscale"
                      value={t.pfVehicule}
                      onChange={(e) =>
                        updateTransport(index, "pfVehicule", e.target.value)
                      }
                    />
                  </div>
                )}

                {t.typeTransport === "VP" && (
                  <div className="alert alert-info text-sm">
                    Les informations de votre véhicule personnel seront reprises
                    automatiquement depuis votre profil.
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
        </div>

        {/* ================= OPTIONS ================= */}
        <div className="card bg-base-100 shadow border">
          <div className="card-body">
            <h2 className="text-xl font-bold">Options</h2>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="sansFrais"
                checked={form.sansFrais}
                onChange={handleChange}
                className="checkbox"
              />
              Sans frais
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="billetAgence"
                checked={form.billetAgence}
                onChange={handleChange}
                className="checkbox"
              />
              Billet agence
            </label>
          </div>
        </div>

        {/* ================= SUBMIT ================= */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary btn-lg"
          >
            {loading ? "Chargement..." : "Créer mission"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateMission;
