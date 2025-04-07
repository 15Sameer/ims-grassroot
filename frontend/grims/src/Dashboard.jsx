import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import './Dashboard.css';
import Sidenav from './sidenav';
import './index.css';

const Dashboard = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    const chartDom = document.getElementById('performanceChart');
    if (!chartDom) return;

    const myChart = echarts.init(chartDom);
    const option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
      },
      legend: {
        data: ['Orders', 'Deliveries'],
        top: 0,
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '40px',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          name: 'Orders',
          type: 'line',
          data: [120, 132, 101, 134, 90, 230, 210],
          itemStyle: {
            color: '#4285f4',
          },
        },
        {
          name: 'Deliveries',
          type: 'line',
          data: [110, 122, 91, 124, 85, 220, 200],
          itemStyle: {
            color: '#34a853',
          },
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return (
    <div className="app">
      {/* Hamburger Icon */}
      <div className="hamburger-icon" onClick={toggleSidebar}>
        ☰
      </div>

      {/* Sidenav */}
      <Sidenav isSidebarVisible={isSidebarVisible} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className={`main-content ${isSidebarVisible ? 'sidebar-visible' : ''}`}>
        <div className="dashboard">
          <div className="dashboard-header">
            <h1 className="dashboard-title">Dashboard Overview</h1>
          </div>

          {/* Overview Cards */}
          <div className="overview-cards">
            <div className="card pending-clients">
              <div className="card-content">
                <p>Pending Clients</p>
                <h2>12</h2>
              </div>
              <div className="card-icon">⏳</div>
            </div>
            <div className="card orders-progress">
              <div className="card-content">
                <p>Orders in progress</p>
                <h2>12</h2>
              </div>
              <div className="card-icon">📦</div>
            </div>
            <div className="card deliveries-today">
              <div className="card-content">
                <p>Deliveries Today</p>
                <h2>12</h2>
              </div>
              <div className="card-icon">🚚</div>
            </div>
            <div className="card low-stock-alerts">
              <div className="card-content">
                <p>Low stock alerts</p>
                <h2>12</h2>
              </div>
              <div className="card-icon">⚠️</div>
            </div>
          </div>

          {/* Performance Overview and Notifications */}
          <div className="dashboard-bottom">
            {/* Performance Overview */}
            <div className="performance-overview">
              <h3>Performance Overview</h3>
              <div id="performanceChart" style={{ height: '300px' }}></div>
            </div>

            {/* Notifications */}
            <div className="notifications">
              <h3>Notifications</h3>
              <ul>
                <li><strong>Volunteer 1:</strong> Verified client calls</li>
                <li><strong>Volunteer 2:</strong> Packed and sent to drivers</li>
                <li><strong>Volunteer 3:</strong> Delivered and report/feedback generated check it.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;