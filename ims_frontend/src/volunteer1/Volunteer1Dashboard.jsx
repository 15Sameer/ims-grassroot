import React from 'react'
import AppHeader from './AppHeader'
import TaskList from './TaskList'
import Sidebar from './Sidebar'

const Dashboard = () => {
  const tasks = [
    {
      id: 'VT-2024-001',
      status: 'New Task',
      title: 'Medical Equipment Verification',
      assigned: '2h ago',
      client: {
        name: 'Sarah Johnson',
        phone: '+1 (555) 123-4567',
        address: '123 Healthcare Ave, New York, NY 10001'
      },
      item: {
        name: 'Wheelchair Model X-100',
        serial: 'WC-2024-123',
        category: 'Mobility Equipment'
      }
    }
  ]

  return (
    <div className="dashboard">
      <AppHeader />
      <div className="container-fluid py-4">
        <div className="row">
          <div className="col-lg-9">
            <TaskList tasks={tasks} />
          </div>
          <div className="col-lg-3">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard