import { ArrowLeft } from "lucide-react";

const Page_Title = ({ Title, Subtitle }) => {
  return (
    <div className="card bg-base-100 text-base-content">
      <div className="flex items-center">

        <div className="w-1/3 flex items-center xl:h-15 h-10">
          <ArrowLeft
            className="cursor-pointer"
            onClick={() => window.history.back()}
          />
        </div>

        <div className="xl:w-1/3 xl:text-2xl w-full flex justify-center font-bold">
          {Title}
        </div>

        <div className="w-1/3"></div>
      </div>

      <div>{Subtitle}</div>
    </div>
  );
};

export default Page_Title;
