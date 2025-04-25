// src/admin/SideNav.jsx
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Sidenav.css';
import Grassroot from '../assets/images/Grassroot.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChartBar, 
  faUser, 
  faClipboardList, 
  faBox, 
  faFileAlt,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const Sidenav = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setSidebarVisible(false);
  };

  const handleLogout = () => {
    // Clear any stored data
    localStorage.removeItem('selectedLocation');
    localStorage.removeItem('rememberedId');
    localStorage.removeItem('rememberedPwd');
    
    // Navigate to login page
    navigate('/');
  };

  const isActive = (path) => {
    // Remove leading slash and split the path
    const currentPath = location.pathname.split('/').filter(Boolean);
    const targetPath = path.split('/').filter(Boolean);
    
    // Check if the current path starts with the target path
    return currentPath[0] === targetPath[0] && currentPath[1] === targetPath[1] ? 'active' : '';
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
          <li 
            className={`menu-item ${isActive('/admin/dashboard')}`} 
            onClick={() => handleNavigation('/admin/dashboard')}
          >
            <FontAwesomeIcon icon={faChartBar} className="icon" /> Dashboard
          </li>
          <li 
            className={`menu-item ${isActive('/admin/volunteer')}`} 
            onClick={() => handleNavigation('/admin/volunteer')}
          >
            <FontAwesomeIcon icon={faUser} className="icon" /> Volunteers
          </li>
          <li 
            className={`menu-item ${isActive('/admin/orders')}`} 
            onClick={() => handleNavigation('/admin/orders')}
          >
            <FontAwesomeIcon icon={faClipboardList} className="icon" /> Orders Status
          </li>
          <li 
            className={`menu-item ${isActive('/admin/updatestock')}`} 
            onClick={() => handleNavigation('/admin/updatestock')}
          >
            <FontAwesomeIcon icon={faBox} className="icon" /> Update Stock
          </li>
          <li 
            className={`menu-item ${isActive('/admin/reports')}`} 
            onClick={() => handleNavigation('/admin/reports')}
          >
            <FontAwesomeIcon icon={faFileAlt} className="icon" /> Report
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} className="icon" /> Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidenav;