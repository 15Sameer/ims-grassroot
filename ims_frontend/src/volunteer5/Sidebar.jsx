// src/SpecialVolunteer/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './SpecialVolunteer.module.css'; // Import as a module

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2>Special Volunteer</h2>
      <nav>
        <ul>
          <li><Link to="/special-volunteer/volunteer1">Volunteer 1</Link></li>
          <li><Link to="/special-volunteer/volunteer2">Volunteer 2</Link></li>
          <li><Link to="/special-volunteer/volunteer3">Volunteer 3</Link></li>
          <li><Link to="/special-volunteer/volunteer4">Volunteer 4</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
