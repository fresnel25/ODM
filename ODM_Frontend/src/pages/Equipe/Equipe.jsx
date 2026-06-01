import React, { useState } from "react";
import Page_Title from "../../components/Page-Title/Page_Title";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import CreateTeam from "./CreateTeam";
import GetAllEquipes from "./GetAllEquipes";
import DetailEquipe from "./DetailEquipe";
import EditEquipe from "./EditEquipe";

const Equipe = () => {
  const [selectedEquipe, setSelectedEquipe] = useState(null);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const refreshEquipes = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des équipes"} />
        </div>
        <div>
          <CreateTeam onSuccess={refreshEquipes} />
        </div>
        <div>
          <GetAllEquipes
            refresh={refresh}
            setSelectedEquipe={setSelectedEquipe}
            setOpenView={setOpenView}
            setOpenEdit={setOpenEdit}
            refreshEquipes={refreshEquipes}
          />
        </div>
        <div>
          <DetailEquipe
            openView={openView}
            setOpenView={setOpenView}
            selectedEquipe={selectedEquipe}
          />
        </div>
        <div>
          <EditEquipe
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            selectedEquipe={selectedEquipe}
            onSuccess={refreshEquipes}
          />
        </div>
      </div>
    </div>
  );
};

export default Equipe;
