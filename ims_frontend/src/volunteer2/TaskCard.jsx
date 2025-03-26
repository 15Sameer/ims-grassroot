// src/volunteer2/TaskCard.jsx
import React from "react";

function TaskCard({ id, item, quantity, recipient, phone, due, urgency }) {
  return (
    <div className="card p-3 my-2">
      <div className="d-flex justify-content-between">
        <span className="fw-bold">Task #{id}</span>
        <span className={`small ${urgency}`}>
          <i className="far fa-clock me-1"></i>
          Due in {due}
        </span>
      </div>
      <div className="row mt-2">
        <div className="col-6">
          <small className="text-muted">Item</small>
          <div>{item}</div>
        </div>
        <div className="col-6">
          <small className="text-muted">Quantity</small>
          <div>{quantity}</div>
        </div>
        <div className="col-6">
          <small className="text-muted">Recipient</small>
          <div>{recipient}</div>
        </div>
        <div className="col-6">
          <small className="text-muted">Phone</small>
          <div>{phone}</div>
        </div>
      </div>
      <div className="d-flex mt-3">
        <button className="btn btn-primary me-2 w-50">Start Packaging</button>
        <button className="btn btn-outline-secondary w-50">View Details</button>
      </div>
    </div>
  );
}

export default TaskCard;
