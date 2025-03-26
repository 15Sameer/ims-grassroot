// src/admin/Dashboard.jsx
import React from 'react';
import styles from './adminPanel.module.css';

const Dashboard = () => {
  return (
    <div className={styles.page}>
      <h2>Dashboard</h2>
      <p>Welcome to the Admin Dashboard. Here you can see an overview of system metrics.</p>
      <div className={styles.metrics}>
        <div className={styles.metricCard}>
          <h3>Total Orders</h3>
          <p>150</p>
        </div>
        <div className={styles.metricCard}>
          <h3>Pending Volunteer Calls</h3>
          <p>25</p>
        </div>
        <div className={styles.metricCard}>
          <h3>Driver Assignments</h3>
          <p>10</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;