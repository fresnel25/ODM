import React from 'react'
import ModalForm from "../../components/Utils/ModalForm";
import EditProjectForm from './EditProjectForm';

const EditProject = ({openEdit, setOpenEdit, selectedProjet, onSuccess}) => {
   return (
    <ModalForm
      titre="Modifier projet"
      isOpen={openEdit}
      onClose={() => setOpenEdit(false)}
    >
      {selectedProjet && (
        <EditProjectForm
          projet={selectedProjet}
          onSuccess={() => {
            onSuccess();
            setOpenEdit(false);
          }}
        />
      )}
    </ModalForm>
  );
}

export default EditProject