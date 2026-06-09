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
import Mission from "./pages/Mission/Mission";
import Support from "./pages/Support/Support";
import ProtectedRoute from "./routes/ProtectedRoute";
import Profile from "./pages/Utilisateur/Profile";
import MyMission from "./pages/Mission/MyMission";

function App() {
  return (
    <div>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* Routes publiques */}
          <Route index element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Page404 />} />

          {/*  Dashboard protégé */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<Page404 />} />

            <Route index element={<Dashboard />} />
            <Route path="parametres" element={<Parametre />} />
            <Route path="utilisateurs" element={<Utilisateur />} />
            <Route path="profile" element={<Profile/>}/>
            <Route path="utilisateurs/:id" element={<Profile/>}/>
            <Route path="projets" element={<Project />} />
            <Route path="motifs" element={<Motif />} />
            <Route path="equipes" element={<Equipe />} />
            <Route path="missions" element={<Mission />} />
            <Route path="myMissions" element={<MyMission />} />
            <Route path="supports" element={<Support />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
