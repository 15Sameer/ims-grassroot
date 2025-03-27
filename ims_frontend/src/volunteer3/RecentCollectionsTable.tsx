// src/components/RecentCollectionsTable.tsx
import React from 'react';
import { Collection } from './types';

const RecentCollectionsTable = ({ collections }: { collections: Collection[] }) => {
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <h2 className="card-title mb-4">Recent Collections</h2>
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Package ID</th>
                <th>Items</th>
                <th>Customer</th>
                <th>Collection Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {collections.map((collection) => (
                <tr key={collection.id}>
                  <td>{collection.id}</td>
                  <td>{collection.items}</td>
                  <td>{collection.customer}</td>
                  <td>{collection.collectionTime}</td>
                  <td>
                    <span className={`badge ${collection.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                      {collection.status === 'completed' ? 'Completed' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentCollectionsTable;