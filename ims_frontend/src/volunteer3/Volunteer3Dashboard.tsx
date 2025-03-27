// src/Volunteer3Dashboard.tsx
import React from 'react';
import { useState } from 'react';
import Navbar from './Navbar';
import StatsCard from './StatsCard';
import PackageCard from './PackageCard';
import RecentCollectionsTable from './RecentCollectionsTable';
import { FaBox, FaClock, FaCheckCircle, FaStopwatch } from 'react-icons/fa';
import { Package, Collection } from './types';

function Volunteer3Dashboard() {
  const [activePackages] = useState<Package[]>([
    {
      id: '#PKG-2024-001',
      status: 'ready',
      items: 'Electronics Package (x2)',
      packer: 'Sarah Wilson',
      customer: {
        name: 'Michael Brown',
        phone: '+1 234-567-8900'
      },
      address: '123 Main St, Suite 4B\nNew York, NY 10001',
      progress: {
        packed: true,
        collecting: false,
        assigned: false
      }
    },
    {
      id: '#PKG-2024-002',
      status: 'in-progress',
      items: 'Fashion Items (x5)',
      packer: 'James Cooper',
      customer: {
        name: 'Emma Davis',
        phone: '+1 234-567-8901'
      },
      address: '456 Park Ave\nNew York, NY 10002',
      progress: {
        packed: true,
        collecting: true,
        assigned: false
      }
    }
  ]);

  const [recentCollections] = useState<Collection[]>([
    {
      id: '#PKG-2024-003',
      items: 'Books (x3)',
      customer: 'Alex Johnson',
      collectionTime: 'Today, 10:30 AM',
      status: 'completed'
    },
    {
      id: '#PKG-2024-004',
      items: 'Food Items (x8)',
      customer: 'Sophie Turner',
      collectionTime: 'Today, 09:45 AM',
      status: 'completed'
    }
  ]);

  return (
    <div className="Volunteer3Dashboard">
      <Navbar />
      
      <div className="container-fluid py-4">
        <div className="row g-4 mb-4">
          <div className="col-md-6 col-lg-3">
            <StatsCard 
              icon={<FaBox size={20} />}
              title="Today's Collections"
              value="24"
              color="custom"
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatsCard 
              icon={<FaClock size={20} />}
              title="Pending Pickups"
              value="12"
              color="warning"
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatsCard 
              icon={<FaCheckCircle size={20} />}
              title="Completed"
              value="45"
              color="success"
            />
          </div>
          <div className="col-md-6 col-lg-3">
            <StatsCard 
              icon={<FaStopwatch size={20} />}
              title="Avg. Time"
              value="15m"
              color="primary"
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="mb-0">Active Packages</h2>
              <div className="d-flex gap-2">
                <div className="input-group">
                  <span className="input-group-text"><i className="bi bi-search"></i></span>
                  <input type="text" className="form-control" placeholder="Search packages..." />
                </div>
                <select className="form-select">
                  <option>All Status</option>
                  <option>Ready for Pickup</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="row g-4 mb-5">
          {activePackages.map((pkg) => (
            <div key={pkg.id} className="col-lg-6">
              <PackageCard packageData={pkg} />
            </div>
          ))}
        </div>

        <div className="row">
          <div className="col-12">
            <RecentCollectionsTable collections={recentCollections} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Volunteer3Dashboard;