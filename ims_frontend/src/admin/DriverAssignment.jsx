// src/admin/DriverAssignment.jsx
import React from 'react';
import styles from './adminPanel.module.css';

const DriverAssignment = () => {
  const assignments = [
    { id: 1, driver: 'Alex', client: 'John Doe', address: '123 Main St', status: 'Pending' },
    { id: 2, driver: 'Emma', client: 'Jane Smith', address: '456 Oak Ave', status: 'In Progress' },
  ];

  return (
    <div className={styles.page}>
      <h2>Driver Assignment</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Driver</th>
            <th>Client</th>
            <th>Address</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {assignments.map((assignment) => (
            <tr key={assignment.id}>
              <td>{assignment.id}</td>
              <td>{assignment.driver}</td>
              <td>{assignment.client}</td>
              <td>{assignment.address}</td>
              <td>{assignment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverAssignment;