// src/admin/VolunteerCalls.jsx
import React from 'react';
import styles from './adminPanel.module.css';

const VolunteerCalls = () => {
  const calls = [
    { id: 1, volunteer: 'Mike', client: 'John Doe', status: 'Pending' },
    { id: 2, volunteer: 'Sara', client: 'Jane Smith', status: 'Completed' },
  ];

  return (
    <div className={styles.page}>
      <h2>Volunteer Calls</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Volunteer</th>
            <th>Client</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {calls.map((call) => (
            <tr key={call.id}>
              <td>{call.id}</td>
              <td>{call.volunteer}</td>
              <td>{call.client}</td>
              <td>{call.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VolunteerCalls;
