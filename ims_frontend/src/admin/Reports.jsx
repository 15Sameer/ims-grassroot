// src/admin/Reports.jsx
import React, { useState, useEffect } from 'react';
import './Reports.css';
import SideNav from './SideNav';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedReport, setExpandedReport] = useState(null);
  const [responseText, setResponseText] = useState('');

  // Mock data
  useEffect(() => {
    const fetchReports = async () => {
      setTimeout(() => {
        const mockReports = [
          {
            id: 'RPT-1001',
            customer: { name: 'John Doe', email: 'john@example.com', avatar: 'JD' },
            type: 'Complaint',
            subject: 'Damaged Product',
            message: 'The product arrived damaged and unusable. The packaging was torn and the contents were broken. I would like a replacement or refund as soon as possible.',
            status: 'Pending',
            date: '2023-05-15',
            response: '',
            priority: 'High'
          },
          {
            id: 'RPT-1002',
            customer: { name: 'Jane Smith', email: 'jane@example.com', avatar: 'JS' },
            type: 'Feedback',
            subject: 'Great Service',
            message: 'I just wanted to say how impressed I was with your customer service team. They resolved my issue quickly and professionally.',
            status: 'Resolved',
            date: '2023-05-16',
            response: 'Thank you for your kind words! We appreciate your feedback.',
            priority: 'Low'
          },
          {
            id: 'RPT-1003',
            customer: { name: 'Robert Johnson', email: 'robert@example.com', avatar: 'RJ' },
            type: 'Suggestion',
            subject: 'Product Improvement',
            message: 'Have you considered adding a dark mode option to your mobile app? It would be much easier on the eyes during nighttime use.',
            status: 'In Progress',
            date: '2023-05-17',
            response: 'This suggestion has been forwarded to our development team.',
            priority: 'Medium'
          },
          {
            id: 'RPT-1004',
            customer: { name: 'Emily Davis', email: 'emily@example.com', avatar: 'ED' },
            type: 'Complaint',
            subject: 'Late Delivery',
            message: 'My order was supposed to arrive on May 10th but didn\'t come until the 15th. This delay caused significant inconvenience.',
            status: 'Pending',
            date: '2023-05-18',
            response: '',
            priority: 'High'
          },
          {
            id: 'RPT-1005',
            customer: { name: 'Michael Wilson', email: 'michael@example.com', avatar: 'MW' },
            type: 'Question',
            subject: 'Product Specifications',
            message: 'Could you provide more detailed specifications about the material used in your premium product line?',
            status: 'Resolved',
            date: '2023-05-19',
            response: 'The premium line uses 100% organic cotton with reinforced stitching.',
            priority: 'Medium'
          },
        ];
        setReports(mockReports);
        setLoading(false);
      }, 1000);
    };

    fetchReports();
  }, []);

  const filteredReports = reports.filter(report => {
    const matchesFilter = filter === 'all' || report.status.toLowerCase() === filter;
    const matchesSearch = report.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         report.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateStatus = (id, newStatus) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, status: newStatus } : report
    ));
  };

  const submitResponse = (id) => {
    setReports(reports.map(report => 
      report.id === id ? { ...report, response: responseText } : report
    ));
    setResponseText('');
    setExpandedReport(null);
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending': return 'status-pending';
      case 'In Progress': return 'status-in-progress';
      case 'Resolved': return 'status-resolved';
      default: return '';
    }
  };

  const getTypeClass = (type) => {
    switch (type) {
      case 'Complaint': return 'type-complaint';
      case 'Feedback': return 'type-feedback';
      case 'Suggestion': return 'type-suggestion';
      case 'Question': return 'type-question';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="app">
        <SideNav />
        <div className="main-content">
          <div className="loading">Loading reports...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <SideNav />
      <div className="main-content reports-dashboard">
        <div className="reports-header">
          <h1>Customer Feedback Dashboard</h1>
          <p>Manage and respond to customer reports and feedback</p>
          
          <div className="controls-row">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search reports..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <i className="fas fa-search"></i>
            </div>
            
            <div className="filter-tabs">
              <button 
                className={filter === 'all' ? 'active' : ''} 
                onClick={() => setFilter('all')}
              >
                All Reports
              </button>
              <button 
                className={filter === 'pending' ? 'active' : ''} 
                onClick={() => setFilter('pending')}
              >
                Pending
              </button>
              <button 
                className={filter === 'in progress' ? 'active' : ''} 
                onClick={() => setFilter('in progress')}
              >
                In Progress
              </button>
              <button 
                className={filter === 'resolved' ? 'active' : ''} 
                onClick={() => setFilter('resolved')}
              >
                Resolved
              </button>
            </div>
          </div>
        </div>
        
        <div className="reports-overview">
          <div className="overview-card total">
            <h3>Total Reports</h3>
            <p>{reports.length}</p>
          </div>
          <div className="overview-card pending">
            <h3>Pending</h3>
            <p>{reports.filter(r => r.status === 'Pending').length}</p>
          </div>
          <div className="overview-card in-progress">
            <h3>In Progress</h3>
            <p>{reports.filter(r => r.status === 'In Progress').length}</p>
          </div>
          <div className="overview-card resolved">
            <h3>Resolved</h3>
            <p>{reports.filter(r => r.status === 'Resolved').length}</p>
          </div>
        </div>
        
        <div className="reports-grid">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => (
              <div 
                key={report.id} 
                className={`report-card ${expandedReport === report.id ? 'expanded' : ''}`}
              >
                <div className="card-header">
                  <div className="customer-avatar">
                    {report.customer.avatar}
                  </div>
                  <div className="customer-info">
                    <h4>{report.customer.name}</h4>
                    <p>{report.customer.email}</p>
                  </div>
                  <div className={`priority-tag ${getPriorityClass(report.priority)}`}>
                    {report.priority}
                  </div>
                </div>
                
                <div className="card-body">
                  <div className="report-meta">
                    <span className={`type-badge ${getTypeClass(report.type)}`}>
                      {report.type}
                    </span>
                    <span className="report-date">{report.date}</span>
                    <span className={`status-badge ${getStatusClass(report.status)}`}>
                      {report.status}
                    </span>
                  </div>
                  
                  <h3 className="report-subject">{report.subject}</h3>
                  
                  <p className="report-message">
                    {report.message.length > 100 && !(expandedReport === report.id)
                      ? `${report.message.substring(0, 100)}...`
                      : report.message}
                  </p>
                  
                  {expandedReport === report.id && (
                    <div className="report-details">
                      {report.response ? (
                        <div className="admin-response">
                          <h4>Your Response:</h4>
                          <p>{report.response}</p>
                        </div>
                      ) : (
                        <div className="response-form">
                          <h4>Add Response:</h4>
                          <textarea
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                            placeholder="Type your response here..."
                          />
                          <div className="form-actions">
                            <select
                              value={report.status}
                              onChange={(e) => updateStatus(report.id, e.target.value)}
                              className={`status-select ${getStatusClass(report.status)}`}
                            >
                              <option value="Pending">Pending</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Resolved">Resolved</option>
                            </select>
                            <button 
                              className="submit-response"
                              onClick={() => submitResponse(report.id)}
                            >
                              Send Response
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="card-footer">
                  <span className="report-id">{report.id}</span>
                  <button 
                    className="toggle-details"
                    onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                  >
                    {expandedReport === report.id ? 'Collapse' : 'View Details'}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-reports">
              <i className="fas fa-inbox"></i>
              <p>No reports match your current filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;