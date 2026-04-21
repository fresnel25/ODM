import { useNavigate, useParams } from "react-router-dom";
import "./pnf.css";
import ButtonForm from "../../components/composant_formulaire/ButtonForm";

const Page404 = () => {
  const { tenantSlug } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/dashboard/${tenantSlug}`);
  };
  return (
    <div className="mt-10">
      <section className="page_404">
        <div className="four_zero_four_bg">
          <h1 className="text-center ">404</h1>
        </div>

        <div className="text-base-100 text-2xl text-center">
          <h3 className="">On dirait que vous êtes perdue !</h3>

          <p>La page que vous recherchez n’est pas disponible!</p>
        </div>

        <div className="flex justify-center p-4">
          <ButtonForm onClick={handleClick} title="Retour sur le dashboard" />
        </div>
      </section>
    </div>
  );
};

export default Page404;
