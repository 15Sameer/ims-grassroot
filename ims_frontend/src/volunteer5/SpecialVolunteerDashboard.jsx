// src/volunteer5/SpecialVolunteerDashboard.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Volunteer1Dashboard from '../volunteer1/Volunteer1Dashboard';
import Volunteer2Dashboard from '../volunteer2/Volunteer2Dashboard';
import Volunteer3Dashboard from '../volunteer3/Volunteer3Dashboard';
import DriverPortal from '../volunteer4/DriverPortal';
import styles from './SpecialVolunteer.module.css';

const SpecialVolunteerDashboard = () => {
  return (
    <div className={styles.specialVolunteerContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <header className={styles.header}>
          <h1>Special Volunteer Dashboard</h1>
          <p>Manage and view work of all volunteers</p>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="volunteer1" />} />
          <Route path="volunteer1" element={<Volunteer1Dashboard />} />
          <Route path="volunteer2" element={<Volunteer2Dashboard />} />
          <Route path="volunteer3" element={<Volunteer3Dashboard />} />
          <Route path="volunteer4" element={<DriverPortal />} />
        </Routes>
      </div>
    </div>
  );
};

export default SpecialVolunteerDashboard;
