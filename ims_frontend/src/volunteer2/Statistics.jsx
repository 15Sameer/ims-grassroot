// src/volunteer2/Statistics.jsx
import React from "react";

function Statistics() {
  return (
    <div className="card shadow-sm p-3 my-3">
      <h5 className="card-title">Today's Statistics</h5>
      <div className="d-flex justify-content-between">
        <span className="text-muted">Completed Tasks</span>
        <span className="fw-bold">5</span>
      </div>
      <div className="d-flex justify-content-between">
        <span className="text-muted">Pending Tasks</span>
        <span className="fw-bold">3</span>
      </div>
      <div className="d-flex justify-content-between">
        <span className="text-muted">Average Time</span>
        <span className="fw-bold">15 mins</span>
      </div>
    </div>
  );
}

export default Statistics;
