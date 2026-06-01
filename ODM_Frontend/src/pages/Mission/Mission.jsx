import React, { useState } from "react";
import Page_Title from "../../components/Page-Title/Page_Title";
import CreateMission from "./CreateMission";
import GetAllMissions from "./GetAllMissions";

const Mission = () => {
  const [reloadKey, setReloadKey] = useState(0);

  const refreshMissions = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <div className="flex flex-col gap-5">
      <Page_Title Title="Liste des missions" />

      <GetAllMissions refresh={reloadKey} refreshMissions={refreshMissions} />
    </div>
  );
};

export default Mission;
