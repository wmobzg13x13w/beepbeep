
import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./user/Login";
import RegisterForm from "./user/Register"
import Verify from "./user/Verify";
import PresidentHome from "./dashbord/PresidentHome";
import Dashboard from "./dashbord/Dash";
import ShartBar from "./dashbord/shartBar";
import AjouterCollis from "./dashbord/AjouterCollis";
import ImportColis from "./dashbord/ImportColis";
import GestionColis from "./dashbord/GestionColis";
import ExampleTable from "./dashbord/ExampleTable";
import GestionDeRetour from "./dashbord/GestionDeRetour";
import GestionDePaiement from "./dashbord/GestionDePaiement";
import GestionDeManifestes from "./dashbord/GestionDeManifestes";
import PaimenetDetails from "./dashbord/PaimenetDetails";


const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" replace />;
};


function App() {
  return (

    <Router>
      
      <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
  <Routes>
                {/* <Route path="/" element={<ProtectedRoute element={<Dashboard />} />} /> */}
                <Route path="/importColis" element={<ImportColis />} />
                <Route path="/GestionColis" element={<GestionColis />} />
                <Route path="/exmpkeTable" element={<ExampleTable />} />
                <Route path="/retour" element={<GestionDeRetour />} />
                <Route path="/paiment" element={<GestionDePaiement />} />
                <Route path="/manifestes" element={<GestionDeManifestes />} />
                <Route path="/paiement/:id" element={<PaimenetDetails />} />

                <Route path="/login" element={<Login />} />
                <Route path="/" element={<PresidentHome />} />
                <Route path="/bar" element={<ShartBar />} />
                <Route path="/ajoute" element={<AjouterCollis />} />

                <Route path="/register" element={<RegisterForm />} />
            </Routes>

      </Router>

  );
}

export default App;
