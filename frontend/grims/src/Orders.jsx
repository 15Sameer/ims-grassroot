import React, { useState, useEffect } from 'react';
import './Orders.css';
import './index.css';
import SideNav from './sidenav';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data based on schema
  useEffect(() => {
    const fetchOrders = async () => {
      // Simulate API call
      setTimeout(() => {
        const mockOrders = [
          {
            order_id: 'ORD-1001',
            client_id: 'CL-001',
            items: ['T-Shirt', 'Jeans', 'Sneakers'],
            order_date: '2023-05-15',
            delivery_date: '2023-05-20',
            created_by: 'admin1',
            status: 'delivered'
          },
          {
            order_id: 'ORD-1002',
            client_id: 'CL-002',
            items: ['Laptop', 'Mouse'],
            order_date: '2023-05-16',
            delivery_date: '2023-05-22',
            created_by: 'admin2',
            status: 'packed'
          },
          {
            order_id: 'ORD-1003',
            client_id: 'CL-003',
            items: ['Book', 'Notebook', 'Pen Set'],
            order_date: '2023-05-17',
            delivery_date: '2023-05-25',
            created_by: 'admin1',
            status: 'approved'
          },
          {
            order_id: 'ORD-1004',
            client_id: 'CL-004',
            items: ['Smartphone', 'Case', 'Screen Protector'],
            order_date: '2023-05-18',
            delivery_date: '2023-05-23',
            created_by: 'admin3',
            status: 'pending'
          },
          {
            order_id: 'ORD-1005',
            client_id: 'CL-005',
            items: ['Headphones', 'Charger'],
            order_date: '2023-05-19',
            delivery_date: '2023-05-26',
            created_by: 'admin2',
            status: 'approved'
          },
        ];
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = order.order_id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         order.client_id.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(order => 
      order.order_id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'delivered': return 'status-delivered';
      case 'packed': return 'status-packed';
      case 'approved': return 'status-approved';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  if (loading) {
    return (
      <div className="app">
        <SideNav />
        <div className="main-content">
          <div className="loading">Loading orders...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <SideNav />
      <div className="main-content">
        <div className="order-details-container">
          <div className="order-header">
            <h2>Order Management</h2>
            
            <div className="order-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by Order ID or Client ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
              
              <div className="filter-buttons">
                <button 
                  className={filter === 'all' ? 'active' : ''} 
                  onClick={() => setFilter('all')}
                >
                  All Orders
                </button>
                <button 
                  className={filter === 'pending' ? 'active' : ''} 
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </button>
                <button 
                  className={filter === 'approved' ? 'active' : ''} 
                  onClick={() => setFilter('approved')}
                >
                  Approved
                </button>
                <button 
                  className={filter === 'packed' ? 'active' : ''} 
                  onClick={() => setFilter('packed')}
                >
                  Packed
                </button>
                <button 
                  className={filter === 'delivered' ? 'active' : ''} 
                  onClick={() => setFilter('delivered')}
                >
                  Delivered
                </button>
              </div>
            </div>
          </div>
          
          <div className="order-table-container">
            <table className="order-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Client ID</th>
                  <th>Items</th>
                  <th>Order Date</th>
                  <th>Delivery Date</th>
                  <th>Created By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order) => (
                    <tr key={order.order_id}>
                      <td>{order.order_id}</td>
                      <td>{order.client_id}</td>
                      <td>
                        <div className="items-list">
                          {order.items.map((item, index) => (
                            <span key={index} className="item-tag">{item}</span>
                          ))}
                        </div>
                      </td>
                      <td>{order.order_date}</td>
                      <td>{order.delivery_date}</td>
                      <td>{order.created_by}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="view-btn"
                            onClick={() => {/* Implement view details */}}
                          >
                            <i className="fas fa-eye"></i>
                          </button>
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.order_id, e.target.value)}
                            className="status-select"
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="packed">Packed</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-orders">
                      No orders found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="order-stats">
            <div className="stat-card">
              <h3>Total Orders</h3>
              <p>{orders.length}</p>
            </div>
            <div className="stat-card">
              <h3>Pending</h3>
              <p>{orders.filter(o => o.status === 'pending').length}</p>
            </div>
            <div className="stat-card">
              <h3>Approved</h3>
              <p>{orders.filter(o => o.status === 'approved').length}</p>
            </div>
            <div className="stat-card">
              <h3>Packed</h3>
              <p>{orders.filter(o => o.status === 'packed').length}</p>
            </div>
            <div className="stat-card">
              <h3>Delivered</h3>
              <p>{orders.filter(o => o.status === 'delivered').length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;