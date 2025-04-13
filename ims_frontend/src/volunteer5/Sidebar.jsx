// src/volunteer5/Sidebar.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './SpecialVolunteer.module.css';
import Grassroot from '../assets/images/Grassroot.png';

const Sidebar = ({ isSidebarVisible, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNav = (path) => {
    navigate(path);
    toggleSidebar(); // Auto close on mobile
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside className={`${styles.sidebar} ${isSidebarVisible ? styles.visible : ''}`}>
      <div className={styles.sidebarHeader}>
        <img src={Grassroot} alt="Grassroot Logo" className={styles.sidebarLogo} />
      </div>
      <ul className={styles.menu}>
        <li className={`${styles.menuItem} ${isActive('/special-volunteer/volunteer1') ? styles.active : ''}`} onClick={() => handleNav('/special-volunteer/volunteer1')}>
          <span className={styles.icon}>🧑‍💻</span> Volunteer 1
        </li>
        <li className={`${styles.menuItem} ${isActive('/special-volunteer/volunteer2') ? styles.active : ''}`} onClick={() => handleNav('/special-volunteer/volunteer2')}>
          <span className={styles.icon}>🧑‍🔧</span> Volunteer 2
        </li>
        <li className={`${styles.menuItem} ${isActive('/special-volunteer/volunteer3') ? styles.active : ''}`} onClick={() => handleNav('/special-volunteer/volunteer3')}>
          <span className={styles.icon}>👷</span> Volunteer 3
        </li>
        <li className={`${styles.menuItem} ${isActive('/special-volunteer/volunteer4') ? styles.active : ''}`} onClick={() => handleNav('/special-volunteer/volunteer4')}>
          <span className={styles.icon}>🚚</span> Volunteer 4
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
