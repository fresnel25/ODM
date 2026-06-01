import { useEffect } from "react";
import { X } from "lucide-react";

const ModalForm = ({ children, titre, isOpen, onClose }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* SHEET */}
      <div
        className="
          absolute right-0 top-0
          h-full
          w-full sm:w-[90%] md:w-[750px]
          bg-base-100
          shadow-2xl
          animate-in slide-in-from-right
          duration-300
          flex flex-col
        "
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-base-300 px-6 py-4">
          <h2 className="text-xl font-bold">{titre}</h2>

          <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost">
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">{children}</div>
      </div>
    </div>
  );
};

export default ModalForm;
