import { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import Page_Title from "../../components/Page-Title/Page_Title";
import CreateProject from "./CreateProject";
import DetailProject from "./DetailProject";
import EditProject from "./EditProject";
import GetAllProjets from "./GetAllProjects";

const Project = () => {
  const [selectedProjet, setSelectedProjet] = useState(null);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const refreshProjets = () => {
    setRefresh(!refresh);
  };
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des Projets"} />
        </div>
        <div>
          <CreateProject onSuccess={refreshProjets} />
        </div>
        <div>
          <GetAllProjets
            refresh={refresh}
            setSelectedProjet={setSelectedProjet}
            setOpenView={setOpenView}
            setOpenEdit={setOpenEdit}
            refreshProjets={refreshProjets}
          />
        </div>
        <div>
          <DetailProject
            openView={openView}
            setOpenView={setOpenView}
            selectedProjet={selectedProjet}
          />
        </div>
        <div>
          <EditProject
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            selectedProjet={selectedProjet}
            onSuccess={refreshProjets}
          />
        </div>
      </div>
    </div>
  );
};

export default Project;
