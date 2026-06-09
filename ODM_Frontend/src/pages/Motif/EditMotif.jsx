import React from "react";
import ModalForm from "../../components/Utils/ModalForm";
import EditMotifForm from "./EditMotifForm";

const EditMotif = ({ openEdit, setOpenEdit, selectedMotif, onSuccess }) => {
  return (
    <ModalForm
      titre="Modifier motif"
      isOpen={openEdit}
      onClose={() => setOpenEdit(false)}
    >
      {selectedMotif && (
        <EditMotifForm
          motif={selectedMotif}
          onSuccess={() => {
            onSuccess();
            setOpenEdit(false);
          }}
        />
      )}
    </ModalForm>
  );
};

export default EditMotif;
