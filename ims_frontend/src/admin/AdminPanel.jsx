// src/admin/AdminPanel.jsx
import React, { useState } from 'react';
import SideNav from './SideNav';
import Header from './Header';
import Dashboard from './Dashboard';
import InventoryUpdates from './InventoryUpdates';
import Orders from './Orders';
import VolunteerCalls from './VolunteerCalls';
import DriverAssignment from './DriverAssignment';
import Reports from './Reports';
import styles from './adminPanel.module.css';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');

  // Render the page based on the active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Inventory Updates':
        return <InventoryUpdates />;
      case 'Orders':
        return <Orders />;
      case 'Volunteer Calls':
        return <VolunteerCalls />;
      case 'Driver Assignment':
        return <DriverAssignment />;
      case 'Reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.container}>
      <SideNav activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.mainArea}>
        <Header />
        <div className={styles.content}>
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;