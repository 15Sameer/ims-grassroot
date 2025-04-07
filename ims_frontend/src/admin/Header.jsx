// src/admin/Header.jsx
import React from 'react';
import styles from './adminPanel.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.headerTitle}>
        Inventory Management System - Admin Dashboard
      </h1>
      <button className={styles.logoutButton}>Logout</button>
    </header>
  );
};

export default Header;