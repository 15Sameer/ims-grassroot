// src/admin/SideNav.jsx
import React from 'react';
import styles from './adminPanel.module.css';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const navItems = [
    'Dashboard', 
    'Inventory Updates', 
    'Orders', 
    'Volunteer Calls', 
    'Driver Assignment', 
    'Reports'
  ];

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>Admin Panel</h2>
      <ul className={styles.navList}>
        {navItems.map((item) => (
          <li 
            key={item} 
            className={`${styles.navItem} ${activeTab === item ? styles.activeNavItem : ''}`}
            onClick={() => setActiveTab(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;