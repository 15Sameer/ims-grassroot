// src/volunteer2/Header.jsx
import React from "react";
// If you have a local logo, import it here:
import GrassrootLogo from "../assets/images/Grassroot.png";

function Header() {
  return (
    <nav className="navbar navbar-light bg-white shadow-sm fixed-top">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img src={GrassrootLogo} alt="Logo" className="me-3" style={{ height: "40px", width: "auto" }} />
          <div>
            <div className="text-muted small">Welcome back,</div>
            <div className="fw-bold">John Smith</div>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <span className="text-muted me-3">
            <i className="far fa-clock me-1"></i> Shift: 9:00 AM - 5:00 PM
          </span>
          <button className="btn btn-danger btn-sm">
            <i className="fas fa-sign-out-alt me-1"></i> End Shift
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Header;
