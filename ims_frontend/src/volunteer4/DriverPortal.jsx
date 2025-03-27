// src/admin/DriverPortal.jsx
import React, { useState } from "react";
import styles from "./DriverPortal.module.css";
function DriverPortal() {
  // Sample data for driver assignments
  const [assignments, setAssignments] = useState([
    {
      id: 1,
      clientName: "John Doe",
      address: "123 Main St",
      items: "Diapers, Wipes",
      status: "Pending",
    },
    {
      id: 2,
      clientName: "Jane Smith",
      address: "456 Oak Ave",
      items: "Stroller",
      status: "In Progress",
    },
    {
      id: 3,
      clientName: "Alice Johnson",
      address: "789 Pine Rd",
      items: "Baby Wipes, Bottles",
      status: "Completed",
    },
  ]);

  // Function to update status
  const handleStatusChange = (id, newStatus) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  return (
    <div className={styles.driverPortal}>
      <h1 className={styles.title}>Driver Portal</h1>
      <p className={styles.subtitle}>
        Welcome to the Grassroot Projects Driver Portal. Here you can manage your
        delivery assignments, update statuses, and view route details.
      </p>

      <div className={styles.assignmentList}>
        {assignments.map((assignment) => (
          <div key={assignment.id} className={styles.assignmentCard}>
            <div className={styles.cardHeader}>
              <h2>Client: {assignment.clientName}</h2>
              <span
                className={
                  assignment.status === "Completed"
                    ? styles.statusCompleted
                    : assignment.status === "In Progress"
                    ? styles.statusInProgress
                    : styles.statusPending
                }
              >
                {assignment.status}
              </span>
            </div>
            <p className={styles.infoText}>
              <strong>Address:</strong> {assignment.address}
            </p>
            <p className={styles.infoText}>
              <strong>Items:</strong> {assignment.items}
            </p>
            <div className={styles.buttonGroup}>
              {assignment.status !== "Pending" && (
                <button
                  className={`${styles.btn} ${styles.btnSecondary}`}
                  onClick={() => handleStatusChange(assignment.id, "Pending")}
                >
                  Mark as Pending
                </button>
              )}
              {assignment.status !== "In Progress" && (
                <button
                  className={`${styles.btn} ${styles.btnInProgress}`}
                  onClick={() => handleStatusChange(assignment.id, "In Progress")}
                >
                  In Progress
                </button>
              )}
              {assignment.status !== "Completed" && (
                <button
                  className={`${styles.btn} ${styles.btnSuccess}`}
                  onClick={() => handleStatusChange(assignment.id, "Completed")}
                >
                  Complete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DriverPortal;
