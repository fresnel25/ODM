import React, { useState } from "react";
import Page_Title from "../../components/Page-Title/Page_Title";

import CreateMotif from "./CreateMotif";
import GetAllMotifs from "./GetAllMotifs";
import DetailMotif from "./DetailMotif";
import EditMotif from "./EditMotif";

const Motif = () => {

  const [selectedMotif, setSelectedMotif] = useState(null);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const refreshMotifs = () => {
    setRefresh(!refresh);
  };

  return (
    <div className="flex flex-col">

      <Page_Title Title={"Liste des motifs"} />

      <CreateMotif onSuccess={refreshMotifs} />

      <GetAllMotifs
        refresh={refresh}
        setSelectedMotif={setSelectedMotif}
        setOpenView={setOpenView}
        setOpenEdit={setOpenEdit}
        refreshMotifs={refreshMotifs}
      />

      <DetailMotif
        openView={openView}
        setOpenView={setOpenView}
        selectedMotif={selectedMotif}
      />

      <EditMotif
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        selectedMotif={selectedMotif}
        onSuccess={refreshMotifs}
      />

    </div>
  );
};

export default Motif;