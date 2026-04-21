import React from "react";
import Page_Title from "../../components/Page-Title/Page_Title";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import CreateMission from "./CreateMission";

const Mission = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des missions"} />
        </div>
        <div>
          <CreateMission />
        </div>
      </div>
    </div>
  );
};

export default Mission;
