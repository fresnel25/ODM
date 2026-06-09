import { Outlet } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import { useAuth } from "../../services/context/AuthContext";

const Layout = () => {
  const { user } = useAuth();

  return (
    <div className="drawer lg:drawer-open h-screen overflow-hidden">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col h-screen bg-base-300 text-base-content overflow-hidden">
        {/* HEADER FIXE */}
        <div className="w-full shrink-0 z-50 bg-base-100 shadow">
          <Header name={user?.name?.[0]} prenom={user?.firstName?.[0]} />
        </div>

        {/* OUTLET + FOOTER SCROLLABLE */}
        <div className="flex-1 overflow-y-auto flex flex-col">
          <main className="p-4 flex-1">
            <Outlet />
          </main>

          <div className="shrink-0">
            <Footer />
          </div>
        </div>
      </div>

      {/* SIDENAV FIXE */}
      <div className="drawer-side z-40 h-screen">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>

        <div className="w-72 h-screen overflow-y-auto bg-base-200">
          <Sidenav />
        </div>
      </div>
    </div>
  );
};

export default Layout;
