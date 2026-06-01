import React from 'react'
import ModalForm from '../../components/Utils/ModalForm';

const DetailProject = ({ openView, setOpenView, selectedProjet }) => {
   return (
    <ModalForm
      titre="Détail Projet"
      isOpen={openView}
      onClose={() => setOpenView(false)}
    >
      {selectedProjet && (
        <div className="space-y-4">
          <p>
            <strong>ID :</strong> {selectedProjet.id}
          </p>

          <p>
            <strong>Nom :</strong> {selectedProjet.nomProjet}
          </p>
        </div>
      )}
    </ModalForm>
  );
}

export default DetailProject