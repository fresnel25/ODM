import BtnTheme from "../../components/Utils/BtnTheme";

const Header = ({ name, prenom }) => {
  return (
    <div className="header-custom h-16 px-4 flex justify-between items-center">
      <div className="flex gap-3">
        <div>
          <h2 className="text-xl">Bienvenue</h2>
        </div>
        <div>
          <span className="avatar-custom w-8 h-8 rounded-full flex items-center justify-center font-bold">
            {name}
            {prenom}
          </span>
        </div>
        <div>
          <BtnTheme />
        </div>
      </div>
    </div>
  );
};

export default Header;
