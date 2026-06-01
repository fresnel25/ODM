import React from "react";
import EditEquipeForm from "./EditEquipeForm";
import ModalForm from "../../components/Utils/ModalForm";

const EditEquipe = ({openEdit, setOpenEdit, selectedEquipe, onSuccess}) => {
  return (
    <ModalForm
      titre="Modifier Equipe"
      isOpen={openEdit}
      onClose={() => setOpenEdit(false)}
    >
      {selectedEquipe && (
        <EditEquipeForm
          equipe={selectedEquipe}
          onSuccess={() => {
            onSuccess();
            setOpenEdit(false);
          }}
        />
      )}
    </ModalForm>
  );
};

export default EditEquipe;
