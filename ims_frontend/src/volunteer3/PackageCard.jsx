// src/volunteer3/PackageCard.jsx
import React from 'react';
import { FaBox, FaUser, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const PackageCard = ({ packageData }) => {
  const statusClasses = {
    ready: { bg: 'bg-warning', text: 'text-warning' },
    'in-progress': { bg: 'bg-primary', text: 'text-primary' },
    completed: { bg: 'bg-success', text: 'text-success' }
  };

  const statusText = {
    ready: 'Ready for Pickup',
    'in-progress': 'In Progress',
    completed: 'Completed'
  };

  return (
    <div className="card shadow-sm h-100">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start mb-3">
          <span className={`badge ${statusClasses[packageData.status].bg} ${statusClasses[packageData.status].text} bg-opacity-10`}>
            {statusText[packageData.status]}
          </span>
          <h3 className="mt-2 mb-0">{packageData.id}</h3>
        </div>
        <button className={`btn ${packageData.status === 'ready' ? 'custom-primary' : 'btn-success'}`}>
          {packageData.status === 'ready' ? 'Start Collection' : 'Complete Collection'}
        </button>
      </div>
      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <p className="text-muted small mb-1"><FaBox className="me-1" /> Item Details</p>
          <p className="mb-0">{packageData.items}</p>
        </div>
        <div className="col-md-6 mb-3">
          <p className="text-muted small mb-1"><FaUser className="me-1" /> Packer</p>
          <p className="mb-0">{packageData.packer}</p>
        </div>
        <div className="col-md-6 mb-3">
          <p className="text-muted small mb-1"><FaUser className="me-1" /> Customer</p>
          <p className="mb-0">{packageData.customer.name}</p>
          <p className="text-muted small mb-0"><FaPhone className="me-1" /> {packageData.customer.phone}</p>
        </div>
        <div className="col-md-6 mb-3">
          <p className="text-muted small mb-1"><FaMapMarkerAlt className="me-1" /> Address</p>
          <p className="text-muted small mb-0">{packageData.address}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-muted small mb-2">Progress</p>
        <div className={`progress-step ${packageData.progress.packed ? 'completed' : ''}`}>
          <div className="step-indicator">
            {packageData.progress.packed ? '✓' : '1'}
          </div>
          <small>Packed</small>
        </div>
        <div className={`progress-step ${packageData.progress.collecting ? 'active' : ''}`}>
          <div className="step-indicator">
            {packageData.progress.collecting ? '✓' : '2'}
          </div>
          <small>Collecting</small>
        </div>
        <div className={`progress-step ${packageData.progress.assigned ? 'completed' : ''}`}>
          <div className="step-indicator">
            {packageData.progress.assigned ? '✓' : '3'}
          </div>
          <small>Assigned</small>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
