import BtnTheme from "../../components/Utils/BtnTheme";

import { Menu, Bell, Search } from "lucide-react";

const Header = ({ name, prenom }) => {
  return (
    <div className="header-custom h-16 px-4 flex justify-between items-center">
      {/* GAUCHE */}
      <div className="flex items-center gap-3">
        {/* Hamburger mobile */}
        <label htmlFor="my-drawer" className="btn btn-ghost lg:hidden">
          <Menu />
        </label>
      </div>

      <div className="hidden md:flex flex-1 justify-center">
        <div className="relative w-96">
          <input
            type="text"
            placeholder="Rechercher..."
            className="input input-bordered w-full pl-10"
          />
          <Search className="absolute left-3 top-3 w-4 h-4 opacity-60" />
        </div>
      </div>

      {/* DROITE */}
      <div className="flex items-center gap-4">
        <button className="btn btn-ghost btn-circle">
          <Bell />
        </button>

        <BtnTheme />

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="cursor-pointer">
            <span className="avatar-custom w-9 h-9 rounded-full flex items-center justify-center font-bold hover:scale-105 transition">
              {name}
              {prenom}
            </span>
          </label>

          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 mt-3"
          >
            <li>
              <a>Profil</a>
            </li>
            <li>
              <a>Paramètres</a>
            </li>
            <li>
              <a>Déconnexion</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
