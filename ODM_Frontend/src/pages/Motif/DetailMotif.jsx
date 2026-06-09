import React from "react";
import ModalForm from "../../components/Utils/ModalForm";

const DetailMotif = ({ openView, setOpenView, selectedMotif }) => {
  return (
    <ModalForm
      titre="Détail motif"
      isOpen={openView}
      onClose={() => setOpenView(false)}
    >
      {selectedMotif && (
        <div className="space-y-4">
          <p>
            <strong>ID :</strong> {selectedMotif.id}
          </p>

          <p>
            <strong>Nom :</strong> {selectedMotif.nomMotif}
          </p>
        </div>
      )}
    </ModalForm>
  );
};

export default DetailMotif;
