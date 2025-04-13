// src/admin/SideNav.jsx
import React, { useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom'; // Import useNavigate
import './Sidenav.css';
import Grassroot from '../assets/images/Grassroot.png';

const Sidenav = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate(); 
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path); // Navigate to the specified path
    setSidebarVisible(false); // Close the sidebar on mobile after navigation
  };
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <>
      {/* Hamburger Icon */}
      <div className="hamburger-icon" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidebar */}
      <aside className={`sidebar ${isSidebarVisible ? 'visible' : ''}`}>
        <div className="sidebar-header">
          <img src={Grassroot} alt="Grassroot Projects Logo" className="sidebarlogo" />
        </div>
        <ul className="menu">
          <li className={`menu-item ${isActive('/dashboard')}`} onClick={() => handleNavigation('/admin/dashboard')}>
            <span className="icon">📊</span> Dashboard
          </li>
          <li className={`menu-item ${isActive('/volunteer')}`} onClick={() => handleNavigation('/admin/volunteer')}>
            <span className="icon">👤</span> Volunteers
          </li>
          <li className={`menu-item ${isActive('/orders')}`} onClick={() => handleNavigation('/admin/orders')}>
            <span className="icon">📋</span> Orders Status
          </li>
          <li className={`menu-item ${isActive('/updatestock')}`} onClick={() => handleNavigation('/admin/updatestock')}>
            <span className="icon">🔄</span> Update Stock
          </li>
          <li className={`menu-item ${isActive('/reports')}`} onClick={() => handleNavigation('/admin/reports')}>
            <span className="icon">📊</span> Report
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidenav;