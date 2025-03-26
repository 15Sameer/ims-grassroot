import React from 'react';
import { Card, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const activities = [
    { type: 'verify', id: 'VT-2024-003', time: '1h ago' },
    { type: 'reject', id: 'VT-2024-004', time: '2h ago' },
    { type: 'verify', id: 'VT-2024-005', time: '3h ago' }
  ];

  return (
    <div className="sidebar-sticky">
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Today's Statistics</Card.Title>
          
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <small>Tasks Completed</small>
              <small className="text-primary">8/12</small>
            </div>
            <ProgressBar now={66} variant="primary" className="height-2" />
          </div>
          
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <small>Verification Rate</small>
              <small className="text-success">85%</small>
            </div>
            <ProgressBar now={85} variant="success" className="height-2" />
          </div>
          
          <div>
            <div className="d-flex justify-content-between mb-1">
              <small>Pending Tasks</small>
              <small className="text-warning">4</small>
            </div>
            <ProgressBar now={33} variant="warning" className="height-2" />
          </div>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Title>Recent Activity</Card.Title>
          <div className="activity-feed">
            {activities.map((activity, index) => (
              <div key={index} className="activity-item d-flex mb-3">
                <div className={`icon-circle bg-${activity.type === 'verify' ? 'success' : 'danger'}`}>
                  <FontAwesomeIcon 
                    icon={activity.type === 'verify' ? faCheck : faTimes} 
                    className="text-white" 
                  />
                </div>
                <div className="ms-3">
                  <p className="mb-0 small">
                    {activity.type === 'verify' ? 'Verified' : 'Rejected'} Equipment 
                    <span className="fw-bold"> #{activity.id}</span>
                  </p>
                  <small className="text-muted">{activity.time}</small>
                </div>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Sidebar;