// src/admin/Orders.jsx
import React from 'react';
import styles from './adminPanel.module.css';

const Orders = () => {
  const orders = [
    { id: 1, client: 'John Doe', items: 'Diapers, Wipes', status: 'Processed' },
    { id: 2, client: 'Jane Smith', items: 'Strollers', status: 'Pending' },
    { id: 3, client: 'Alice Johnson', items: 'Baby Wipes', status: 'Processed' },
  ];

  return (
    <div className={styles.page}>
      <h2>Orders</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Items</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.client}</td>
              <td>{order.items}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;