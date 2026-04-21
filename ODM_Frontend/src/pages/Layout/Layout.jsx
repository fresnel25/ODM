import { Outlet,  } from "react-router-dom";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";


const Layout = () => {

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      <Sidenav/>

      <div className="flex flex-col flex-1 bg-base-300 text-base-content">
        <Header name={"J"} prenom= {"F"} />
        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          <Outlet />
        </div>
        <div>
          <Footer/>
        </div>
      </div>
    </div>
  );
};

export default Layout;
