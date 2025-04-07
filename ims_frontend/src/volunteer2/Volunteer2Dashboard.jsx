// src/volunteer2/Volunteer2Dashboard.jsx
import React from "react";
import "./Volunteer2Dashboard.css";
import Header from "./Header";
import TaskList from "./TaskList";
import Statistics from "./Statistics";
import Notifications from "./Notifications";
import HelpSection from "./HelpSection";

function Volunteer2Dashboard({ }) {
  return (
    <div>
      <Header />
      <div className="vol2Dashboard">
      {/* Main content area */}
      <div className="contentArea">
        <div className="leftCol">
          <TaskList />
        </div>
        <div className="rightCol">
          <Statistics />
          <Notifications />
          <HelpSection />
        </div>
      </div>
    </div>
    </div>
  );
}

export default Volunteer2Dashboard;
