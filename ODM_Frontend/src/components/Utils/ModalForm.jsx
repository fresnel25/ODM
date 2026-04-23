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
      <div className="modal-box w-full max-w-4xl p-0">
       
        <div className="px-6 py-4 border-b bg-base-100 border-base-300">
          <h2 className="text-xl font-semibold text-base-content text-center">
            {titre}
          </h2>
        </div>

        
        <div className="bg-base-300 flex justify-center items-center p-6">
          <div className="w-full max-w-2xl">{children}</div>
        </div>

        
        <div className="modal-action px-6 pb-6">
          <ButtonForm onClick={onClose} title={"fermer"} />
        </div>
      </div>
    </dialog>
  );
};

export default ModalForm;
