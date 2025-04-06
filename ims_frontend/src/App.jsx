// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login/Login.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import Volunteer1Dashboard from "./volunteer1/Volunteer1Dashboard.jsx";
import Volunteer2Dashboard from "./volunteer2/Volunteer2Dashboard.jsx";
import Volunteer3Dashboard from "./volunteer3/Volunteer3Dashboard.jsx";
import DriverPortal from "./volunteer4/DriverPortal.jsx";
import SpecialVolunteerDashboard from "./volunteer5/SpecialVolunteerDashboard.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/volunteer1" element={<Volunteer1Dashboard />} />
        <Route path="/volunteer2" element={<Volunteer2Dashboard />} />
        <Route path="/volunteer3" element={<Volunteer3Dashboard />} />
        <Route path="/volunteer4" element={<DriverPortal />} />
        <Route path="/special-volunteer/*" element={<SpecialVolunteerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
