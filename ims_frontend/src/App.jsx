// src/App.jsx
import React, { useState } from "react";
import Login from "./login/Login.jsx";
import AdminPanel from "./admin/AdminPanel.jsx";
import Volunteer1Dashboard from "./volunteer1/Volunteer1Dashboard.jsx";
import Volunteer2Dashboard from "./volunteer2/Volunteer2Dashboard.jsx";
import DriverPortal from "./volunteer3/DriverPortal.jsx";

function App() {
  // Possible values: "login", "admin", "volunteer2", "volunteer3"
  const [currentPanel, setCurrentPanel] = useState("volunteer1");

  return (
    <div>
      {currentPanel === "login" && <Login setCurrentPanel={setCurrentPanel} />}
      {currentPanel === "admin" && <AdminPanel setCurrentPanel={setCurrentPanel} />}
      {currentPanel === "volunteer1" && (
        <Volunteer1Dashboard setCurrentPanel={setCurrentPanel} />
      )}
      {currentPanel === "volunteer2" && (
        <Volunteer2Dashboard setCurrentPanel={setCurrentPanel} />
      )}
      {currentPanel === "volunteer3" && (
        <DriverPortal setCurrentPanel={setCurrentPanel} />
      )}
    </div>
  );
}

export default App;