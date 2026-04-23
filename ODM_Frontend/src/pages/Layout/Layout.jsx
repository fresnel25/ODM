import { Outlet } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="drawer lg:drawer-open h-screen">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col bg-base-300 text-base-content">
        <div className="w-full sticky top-0 z-50 bg-base-100 shadow">
          <Header />
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </div>

        <Footer />
      </div>

      <div className="drawer-side z-40">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        <div className="w-72 min-h-full bg-base-200">
          <Sidenav />
        </div>
      </div>
    </div>
  );
};

export default Layout;
