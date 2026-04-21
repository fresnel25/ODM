import ButtonForm from "../../components/composant_formulaire/ButtonForm";
import Page_Title from "../../components/Page-Title/Page_Title";
import CreateProject from "./CreateProject";

const Project = () => {
  return (
    <div>
      <div className="flex flex-col">
        <div>
          <Page_Title Title={"Liste des Projets"} />
        </div>
        <div>
          <CreateProject />
        </div>
      </div>
    </div>
  );
};

export default Project;
