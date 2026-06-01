import React from "react";
import ModalForm from "../../components/Utils/ModalForm";

const DetailEquipe = ({openView, setOpenView, selectedEquipe}) => {
  return (
    <ModalForm
      titre="Détail Equipe"
      isOpen={openView}
      onClose={() => setOpenView(false)}
    >
      {selectedEquipe && (
        <div className="space-y-4">
          <p>
            <strong>ID :</strong> {selectedEquipe.id}
          </p>

          <p>
            <strong>Nom :</strong> {selectedEquipe.nomEquipe}
          </p>
        </div>
      )}
    </ModalForm>
  );
};

export default DetailEquipe;
