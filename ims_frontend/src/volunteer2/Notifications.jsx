// src/volunteer2/Notifications.jsx
import React from "react";

function Notifications() {
  return (
    <div className="card shadow-sm p-3 my-3">
      <h5 className="card-title">Notifications</h5>
      <div className="d-flex align-items-start">
        <i className="fas fa-bell text-warning me-2"></i>
        <div>
          <p className="mb-0">New high-priority task assigned</p>
          <small className="text-muted">5 minutes ago</small>
        </div>
      </div>
      <div className="d-flex align-items-start mt-2">
        <i className="fas fa-check-circle text-success me-2"></i>
        <div>
          <p className="mb-0">Task #1233 completed successfully</p>
          <small className="text-muted">30 minutes ago</small>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
