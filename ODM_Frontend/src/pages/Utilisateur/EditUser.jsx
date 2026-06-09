import ModalForm from "../../components/Utils/ModalForm";
import { useAuth } from "../../services/context/AuthContext";
import EditUserFormByAdmin from "./EditForm/EditUserFormByAdmin";
import EditUserFormByOwner from "./EditForm/EditUserFormByOwner";

const EditUser = ({ openEdit, setOpenEdit, selectedUser, onSuccess }) => {
  const { user } = useAuth();

  const isAdminOrSecretary =
    user?.role === "ADMIN" || user?.role === "SECRETARY";

  return (
    <ModalForm
      titre={`Modifier ${selectedUser?.email || ""}`}
      isOpen={openEdit}
      onClose={() => setOpenEdit(false)}
    >
      {selectedUser && isAdminOrSecretary && (
        <EditUserFormByAdmin
          user={selectedUser}
          onSuccess={() => {
            onSuccess();
            setOpenEdit(false);
          }}
        />
      )}

      {selectedUser && !isAdminOrSecretary && (
        <EditUserFormByOwner
          user={selectedUser}
          onSuccess={() => {
            onSuccess();
            setOpenEdit(false);
          }}
        />
      )}
    </ModalForm>
  );
};

export default EditUser;
