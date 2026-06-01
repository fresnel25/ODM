import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { settingApi } from "../../services/api/settingService";
import InputForm from "../../components/composant_formulaire/InputForm";
import Textarea from "../../components/Utils/Textarea";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import Page_Title from "../../components/Page-Title/Page_Title";
import AppLogo from "../../components/Utils/AppLogo";
import { useSettings } from "../../services/context/SettingsContext";

const Parametre = () => {
  const [loading, setLoading] = useState(false);
  const [settingsId, setSettingsId] = useState(null);
  const { refreshSettings } = useSettings();

  const [form, setForm] = useState({
    appName: "",
    companyName: "",
    address: "",
    phone: "",
    fax: "",
    email: "",
    website: "",
    logoName: "",
    textFooter: "",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await settingApi.get();
      const data = res.data.data;
      if (data) {
        setSettingsId(data.id);
        setForm({
          appName: data.appName || "",
          companyName: data.companyName || "",
          address: data.address || "",
          phone: data.phone || "",
          fax: data.fax || "",
          email: data.email || "",
          website: data.website || "",
          logoName: data.logoName || "",
          textFooter: data.textFooter || "",
        });
      }
      console.log("logoName:", form.logoName);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await settingApi.uploadLogo(formData);
      const fileName = response.data?.data || response.data;

      setForm((prev) => ({
        ...prev,
        logoName: fileName,
      }));
      await refreshSettings(); 
      toast.success("Logo uploadé");
    } catch (error) {
      toast.error("Erreur upload logo");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await settingApi.save({
        id: settingsId,
        ...form,
      });
      await refreshSettings(); 
      toast.success("Settings enregistrés");
      fetchSettings();
    } catch (error) {
      toast.error("Erreur sauvegarde settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col gap-8 p-4 md:p-8">
      <Page_Title Title="Paramètre Application" />

      <div className="w-full flex justify-center">
        <div className="w-full max-w-5xl bg-base-100 shadow-xl rounded-3xl border border-base-300 p-6 md:p-10">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputForm
                label="Nom App"
                name="appName"
                value={form.appName}
                onChange={handleChange}
                placeholder="App Name"
              />

              <InputForm
                label="Nom Labo"
                name="companyName"
                value={form.companyName}
                onChange={handleChange}
                placeholder="Company Name"
              />

              <InputForm
                label="Adresse Labo"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Address"
              />

              <InputForm
                label="Téléphone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
              />

              <InputForm
                label="Fax"
                name="fax"
                value={form.fax}
                onChange={handleChange}
                placeholder="Fax"
              />

              <InputForm
                label="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
              />

              <InputForm
                label="Site web"
                name="website"
                value={form.website}
                onChange={handleChange}
                placeholder="Website"
              />

              <div className="flex flex-col items-center gap-4">
                <AppLogo
                  logoName={form.logoName}
                  appName={form.appName}
                  size={120}
                />

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
            </div>

            <div className="w-full">
              <Textarea
                label="Pied de Page"
                name="textFooter"
                value={form.textFooter}
                onChange={handleChange}
                placeholder="Footer text"
              />
            </div>

            <div className="flex justify-end">
              <ButtonForm title="Enregistrer" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Parametre;
