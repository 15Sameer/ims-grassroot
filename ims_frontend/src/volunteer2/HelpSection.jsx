// src/volunteer2/HelpSection.jsx
import React from "react";

function HelpSection() {
  return (
    <div className="card shadow-sm p-3">
      <h5 className="card-title">Need Help?</h5>
      <button className="btn btn-primary w-100">
        <i className="fas fa-headset me-2"></i>
        Request Assistance
      </button>
    </div>
  );
}

export default HelpSection;
