import { useEffect, useRef } from "react";
import ButtonForm from "../composant_formulaire/ButtonForm";

const ModalForm = ({ children, titre, isOpen, onClose }) => {
  const dialogRef = useRef();

  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog ref={dialogRef} className="modal" onClose={onClose}>
      <div className="modal-box w-11/12 max-w-5xl bg-base-100">
        {/* Header */}
        <div className="bg-base-300 px-6 py-4 w-full">
          <h3 className="font-bold text-lg">{titre}</h3>
        </div>

        {/* Content */}
        <div className="py-4 mt-5">{children}</div>

        {/* Actions */}
        <div className="modal-action">
          <ButtonForm onClick={onClose} title={"fermer"} />
        </div>
      </div>
    </dialog>
  );
};

export default ModalForm;
