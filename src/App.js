import "./App.css";
import { Link, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Account from "./components/Account";
import Dashboard from "./components/Dashboard";
import UpgradeAccountInformations from "./components/UpgradeAccountInformations";
import Asd from "./components/Asd";
import Asw from "./components/Asw";
import AddService from "./components/AddService";
import AddMasterAvailableSlot from "./components/AddMasterAvailableSlot";
import Test from "./components/test";
import MasterDashboard from "./components/MasterDashboard";
import AddMas from "./components/AddMas";
import AddNewAvailableDates from "./components/AddNewAvailableDates";
import VisitDoctorProfiile from "./components/VisitDoctorProfiile";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.withCredentials = true;

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        {/* <Asd />
        <Asw /> */}
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/test" element={<Test />} />
            <Route path="/addmas" element={<AddMas />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/asd" element={<Asd />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/logout" element={<Logout />} />
            <Route
              path="/dashboard/upgrade_account_informations"
              element={<UpgradeAccountInformations />}
            />
            <Route path="/dashboard/account" element={<Account />} />
            <Route path="/dashboard/add_service" element={<AddService />} />
            <Route path="/dashboard/visit_doctor_profiile" element={<VisitDoctorProfiile />} />
            <Route
              path="/dashboard/add_available_slot"
              element={<AddMasterAvailableSlot />}
            />
            <Route
              path="/master_dashboard"
              element={<MasterDashboard />}
            />
            <Route path="/test" element={<Test />} />
            <Route
              path="/dashboard/add_new_available_dates"
              element={<AddNewAvailableDates />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
