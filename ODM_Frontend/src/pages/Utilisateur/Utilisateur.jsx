import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import Page_Title from "../../components/Page-Title/Page_Title";
import CreateUser from "./CreateUser";
/* import GetAllUser from "./GetAllUser"; */

const Utilisateur = () => {

  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des utilisateurs"} />
        </div>
        <div>
          <CreateUser/>
         {/*  <GetAllUser /> */}
        </div>
      </div>
    </div>
  );
};

export default Utilisateur;
