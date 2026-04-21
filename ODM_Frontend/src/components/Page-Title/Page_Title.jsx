import { ArrowLeft } from "lucide-react";

const Page_Title = ({ Title, Subtitle }) => {
  return (
    <div className="card bg-base-100 text-base-content">
      <div className="flex items-center h-14 w-full relative">
        {/* Colonne de gauche */}
        <div className="w-1/3 flex items-center">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => window.history.back()}
          />
        </div>

        {/* Centre */}
        <div className="w-1/3 flex justify-center text-2xl font-bold">
          {Title}
        </div>

        {/* Colonne de droite vide (pour équilibrer) */}
        <div className="w-1/3"></div>
      </div>


      <div>{Subtitle}</div>
    </div>
  );
};

export default Page_Title;
