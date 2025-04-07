// src/volunteer3/Navbar.jsx
import React from 'react';
import { FaBell } from 'react-icons/fa';
import GrassrootLogo from '../assets/images/GrassRoot.png'; // Correct relative path

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={GrassrootLogo} alt="Grassroot Logo" height="40px" width="auto"/>
        </a>
        
        <div className="d-flex align-items-center">
          <button type="button" className="btn btn-link position-relative p-2">
            <span className="position-absolute top-0 end-0 translate-middle badge rounded-pill bg-danger">3</span>
            <FaBell className="fs-5 text-secondary" />
          </button>
          
          <div className="dropdown ms-3">
            <button className="btn dropdown-toggle d-flex align-items-center" type="button" id="userDropdown" data-bs-toggle="dropdown">
              <img 
                src="https://creatie.ai/ai/api/search-image?query=A professional headshot of a person wearing a casual business attire with a friendly smile, high quality portrait photo&width=100&height=100&orientation=squarish&flag=19578e30-c030-4793-844e-642c509eb829" 
                alt="User" 
                className="rounded-circle me-2" 
                width="32" 
                height="32" 
              />
              <span className="text-dark">John Collector</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
