import { useState } from "react";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import Page_Title from "../../components/Page-Title/Page_Title";
import CreateUser from "./CreateUser";
import EditUser from "./EditUser";
import GetAllUser from "./GetAllUser";
/* import GetAllUser from "./GetAllUser"; */

const Utilisateur = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [openView, setOpenView] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [refresh, setRefresh] = useState(false);

  const refreshUsers = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des utilisateurs"} />
        </div>
        {/* <div>
          <CreateUser />
        </div> */}
        <div>
          <GetAllUser
            refresh={refresh}
            setSelectedUser={setSelectedUser}
            setOpenView={setOpenView}
            setOpenEdit={setOpenEdit}
            refreshUsers={refreshUsers}
          />
          <EditUser
            openEdit={openEdit}
            setOpenEdit={setOpenEdit}
            selectedUser={selectedUser}
            onSuccess={refreshUsers}
          />
        </div>
      </div>
    </div>
  );
};

export default Utilisateur;
