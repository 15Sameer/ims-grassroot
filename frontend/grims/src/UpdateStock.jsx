import React, { useState, useEffect } from 'react';
import './UpdateStock.css';
import SideNav from './sidenav';

const UpdateStock = () => {
  // State management
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newItemModal, setNewItemModal] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const [newItem, setNewItem] = useState({
    item_name: '',
    category: '',
    quantity: 0,
    value: 0,
    supplier: '',
    low_stock_threshold: 10
  });

  // Load mock data
  useEffect(() => {
    const fetchStockItems = async () => {
      setTimeout(() => {
        const mockStockItems = [
          {
            id: 'STK-1001',
            item_name: 'Cotton T-Shirt',
            category: 'Apparel',
            quantity: 150,
            value: 19.99,
            supplier: 'Textile Corp',
            low_stock_threshold: 20,
            last_updated: '2023-05-15'
          },
          {
            id: 'STK-1002',
            item_name: 'Premium Laptop',
            category: 'Electronics',
            quantity: 25,
            value: 899.99,
            supplier: 'Tech Suppliers Inc',
            low_stock_threshold: 5,
            last_updated: '2023-05-16'
          },
          {
            id: 'STK-1003',
            item_name: 'Smartphone X',
            category: 'Electronics',
            quantity: 8,
            value: 699.99,
            supplier: 'Mobile World',
            low_stock_threshold: 10,
            last_updated: '2023-05-17'
          },
          {
            id: 'STK-1004',
            item_name: 'Denim Jeans',
            category: 'Apparel',
            quantity: 45,
            value: 49.99,
            supplier: 'Fashion House',
            low_stock_threshold: 15,
            last_updated: '2023-05-18'
          },
          {
            id: 'STK-1005',
            item_name: 'Wireless Headphones',
            category: 'Electronics',
            quantity: 0,
            value: 129.99,
            supplier: 'Audio Tech',
            low_stock_threshold: 5,
            last_updated: '2023-05-19'
          },
        ];
        setStockItems(mockStockItems);
        setLoading(false);
      }, 1000);
    };

    fetchStockItems();
  }, []);

  // Helper functions
  const getStockStatus = (item) => {
    if (item.quantity === 0) return 'out-of-stock';
    if (item.quantity <= item.low_stock_threshold) return 'low-stock';
    return 'in-stock';
  };

  const filteredItems = stockItems.filter(item => {
    const matchesFilter = filter === 'all' || getStockStatus(item) === filter;
    const matchesSearch = item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.item_name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const calculateTotalValue = () => {
    return stockItems.reduce((total, item) => total + (item.quantity * item.value), 0).toFixed(2);
  };

  const getStatusClass = (item) => {
    const status = getStockStatus(item);
    switch (status) {
      case 'in-stock': return 'status-in-stock';
      case 'low-stock': return 'status-low-stock';
      case 'out-of-stock': return 'status-out-of-stock';
      default: return '';
    }
  };

  // CRUD operations
  const addNewItem = () => {
    const newId = `STK-${1000 + stockItems.length + 1}`;
    setStockItems([...stockItems, {
      id: newId,
      ...newItem,
      last_updated: new Date().toISOString().split('T')[0]
    }]);
    setNewItemModal(false);
    setNewItem({
      item_name: '',
      category: '',
      quantity: 0,
      value: 0,
      supplier: '',
      low_stock_threshold: 10
    });
  };

  const deleteSelected = () => {
    setStockItems(stockItems.filter(item => !selectedItems.includes(item.id)));
    setSelectedItems([]);
  };

  const toggleSelectItem = (id) => {
    setSelectedItems(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  if (loading) {
    return (
      <div className="app">
        <SideNav />
        <div className="main-content">
          <div className="loading">Loading stock data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <SideNav />
      <div className="main-content">
        <div className="stock-management-container">
          <div className="stock-header">
            <h2>Inventory Management</h2>
            
            <div className="stock-actions">
              <button className="btn-add" onClick={() => setNewItemModal(true)}>
                <i className="fas fa-plus"></i> Add Item
              </button>
              {selectedItems.length > 0 && (
                <button className="btn-delete" onClick={deleteSelected}>
                  <i className="fas fa-trash"></i> Delete ({selectedItems.length})
                </button>
              )}
            </div>
            
            <div className="stock-controls">
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Search by ID or Name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="fas fa-search"></i>
              </div>
              
              <div className="filter-buttons">
                <button className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>
                  All
                </button>
                <button className={filter === 'in-stock' ? 'active' : ''} onClick={() => setFilter('in-stock')}>
                  In Stock
                </button>
                <button className={filter === 'low-stock' ? 'active' : ''} onClick={() => setFilter('low-stock')}>
                  Low Stock
                </button>
                <button className={filter === 'out-of-stock' ? 'active' : ''} onClick={() => setFilter('out-of-stock')}>
                  Out of Stock
                </button>
              </div>
            </div>
          </div>
          
          <div className="inventory-stats">
            <div className="stat-card">
              <h3>Total Items</h3>
              <p>{stockItems.length}</p>
            </div>
            <div className="stat-card">
              <h3>In Stock</h3>
              <p>{stockItems.filter(item => getStockStatus(item) === 'in-stock').length}</p>
            </div>
            <div className="stat-card">
              <h3>Low Stock</h3>
              <p>{stockItems.filter(item => getStockStatus(item) === 'low-stock').length}</p>
            </div>
            <div className="stat-card">
              <h3>Out of Stock</h3>
              <p>{stockItems.filter(item => getStockStatus(item) === 'out-of-stock').length}</p>
            </div>
            <div className="stat-card total-value">
              <h3>Total Value</h3>
              <p>${calculateTotalValue()}</p>
            </div>
          </div>
          
          <div className="stock-table-container">
            <table className="stock-table">
              <thead>
                <tr>
                  <th width="40px">
                    <input 
                      type="checkbox" 
                      onChange={toggleSelectAll}
                      checked={selectedItems.length === filteredItems.length && filteredItems.length > 0}
                    />
                  </th>
                  <th>ID</th>
                  <th>Item Name</th>
                  <th>Category</th>
                  <th>Quantity</th>
                  <th>Unit Value</th>
                  <th>Total Value</th>
                  <th>Supplier</th>
                  <th>Threshold</th>
                  <th>Status</th>
                  <th>Last Updated</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map((item) => (
                    <tr key={item.id} className={selectedItems.includes(item.id) ? 'selected' : ''}>
                      <td>
                        <input 
                          type="checkbox" 
                          checked={selectedItems.includes(item.id)}
                          onChange={() => toggleSelectItem(item.id)}
                        />
                      </td>
                      <td>{item.id}</td>
                      <td>{item.item_name}</td>
                      <td className="category">{item.category}</td>
                      <td className={getStockStatus(item) === 'low-stock' ? 'quantity-warning' : ''}>
                        {item.quantity}
                      </td>
                      <td>${item.value.toFixed(2)}</td>
                      <td>${(item.quantity * item.value).toFixed(2)}</td>
                      <td>{item.supplier}</td>
                      <td>{item.low_stock_threshold}</td>
                      <td>
                        <div className={`status-indicator ${getStatusClass(item)}`}>
                          {getStockStatus(item).replace('-', ' ')}
                        </div>
                      </td>
                      <td>{item.last_updated}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="11" className="no-items">
                      No items found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Item Modal */}
        {newItemModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h3>Add New Item</h3>
              <div className="form-group">
                <label>Item Name*</label>
                <input 
                  type="text" 
                  value={newItem.item_name}
                  onChange={(e) => setNewItem({...newItem, item_name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Category*</label>
                <input 
                  type="text" 
                  value={newItem.category}
                  onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                  required
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Quantity*</label>
                  <input 
                    type="number" 
                    min="0"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: parseInt(e.target.value) || 0})}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Unit Value ($)*</label>
                  <input 
                    type="number" 
                    min="0"
                    step="0.01"
                    value={newItem.value}
                    onChange={(e) => setNewItem({...newItem, value: parseFloat(e.target.value) || 0})}
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Supplier*</label>
                <input 
                  type="text" 
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Low Stock Threshold*</label>
                <input 
                  type="number" 
                  min="1"
                  value={newItem.low_stock_threshold}
                  onChange={(e) => setNewItem({...newItem, low_stock_threshold: parseInt(e.target.value) || 10})}
                  required
                />
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setNewItemModal(false)}>
                  Cancel
                </button>
                <button className="btn-confirm" onClick={addNewItem}>
                  Add Item
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UpdateStock;