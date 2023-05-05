import './App.css';
import { Link, BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import Account from './components/Account';
import Dashboard from './components/Dashboard';
import UpgradeAccountInformations from './components/UpgradeAccountInformations';
import Asd from './components/Asd';
import Asw from './components/Asw';
import AddService from './components/AddService';
import AddAvailableSlot from './components/AddAvailableSlot';
import AddMasterAvailableSlot from './components/AddMasterAvailableSlot';
import Test from './components/test';
import MasterDashboard from './components/MasterDashboard';
// import SubnetCalculator from './components/SubnetCalculator;';


axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
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
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/asd" element={<Asd />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/logout" element={<Logout />} />
          <Route path="/dashboard/upgrade_account_informations" element={<UpgradeAccountInformations />} />
          <Route path="/dashboard/account" element={<Account />} />
          <Route path="/dashboard/add_service" element={<AddService />} />
          <Route path="/dashboard/add_available_slot" element={<AddMasterAvailableSlot />} />
          <Route path="/dashboard/master_dashboard" element={<MasterDashboard />} />
          <Route path="/test" element={<Test />} />
          {/* <Route path="/dashboard/master_dashboard" element={<MasterDashboard />} /> */}

        </Routes>
      </div>
    </div>
      </Router>
  );
}

export default App;
;

