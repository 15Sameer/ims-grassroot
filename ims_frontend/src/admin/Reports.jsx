// src/admin/Reports.jsx
import React from 'react';
import styles from './adminPanel.module.css';

const Reports = () => {
  const handleDownload = () => {
    alert("Report downloaded!");
  };

  return (
    <div className={styles.page}>
      <h2>Reports</h2>
      <p>Generate and view reports on inventory, orders, and other metrics.</p>
      <button className={styles.submitButton} onClick={handleDownload}>
        Download Report
      </button>
    </div>
  );
};

export default Reports;