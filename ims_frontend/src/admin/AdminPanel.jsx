// src/admin/AdminPanel.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import Volunteer from './Volunteer'; 
import Orders from './Orders';
import UpdateStock from './UpdateStock';
import Reports from './Reports';
import '../App.css';

function AdminPanel() {
  return (
    <div className="adminPanelWrapper">
      {/* Optional: Add your Sidebar/Header for admin here if needed */}
      <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="volunteer" element={<Volunteer />} />
        <Route path="orders" element={<Orders />} />
        <Route path="updatestock" element={<UpdateStock />} />
        <Route path="reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default AdminPanel;
