// src/volunteer3/StatsCard.jsx
import React from 'react';

const StatsCard = ({ icon, title, value, color }) => {
  const bgClass = `bg-${color}-100`;
  const textClass = `text-${color}`;

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex align-items-center">
          <div className={`rounded-circle p-3 ${bgClass} me-3`}>
            <div className={textClass}>{icon}</div>
          </div>
          <div>
            <h5 className="card-title text-muted mb-1">{title}</h5>
            <h2 className={`mb-0 ${textClass}`}>{value}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
