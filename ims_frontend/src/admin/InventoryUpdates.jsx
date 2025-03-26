// src/admin/InventoryUpdates.jsx
import React, { useState } from 'react';
import styles from './adminPanel.module.css';

const InventoryUpdates = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    alert(`Updated ${item} with quantity ${quantity}`);
    setItem('');
    setQuantity('');
  };

  return (
    <div className={styles.page}>
      <h2>Inventory Updates</h2>
      <form onSubmit={handleUpdate} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Item Name</label>
          <input 
            type="text" 
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Quantity</label>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className={styles.formInput}
            required
          />
        </div>
        <button type="submit" className={styles.submitButton}>Update Inventory</button>
      </form>
    </div>
  );
};

export default InventoryUpdates;