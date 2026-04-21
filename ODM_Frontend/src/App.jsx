import Login from "./pages/formulaire/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/formulaire/Register";
import Layout from "./pages/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Parametre from "./pages/Parametre/Parametre";
import Unauthorized from "./pages/Page404/Unauthorized";
import { ToastContainer } from "react-toastify";
import Page404 from "./pages/Page404/Page404";
import Utilisateur from "./pages/Utilisateur/Utilisateur";
import Project from "./pages/Project/Project";
import Motif from "./pages/Motif/Motif";
import Equipe from "./pages/Equipe/Equipe";
import Lieu from "./pages/Lieu/Lieu";
import Mission from "./pages/Mission/Mission";
import Support from "./pages/Support/Support";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*  Dashboard protégé */}
          <Route path="/dashboard" element={<Layout />}>

            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Page404 />} />
            
            <Route index element={<Dashboard />} />
            <Route path="parametres" element={<Parametre />} />
            <Route path="utilisateurs" element={<Utilisateur />} />
            <Route path="projets" element={<Project />} />
            <Route path="motifs" element={<Motif />} />
            <Route path="equipes" element={<Equipe />} />
            <Route path="missions" element={<Mission />} />
            <Route path="lieux" element={<Lieu />} />
            <Route path="supports" element={<Support />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
