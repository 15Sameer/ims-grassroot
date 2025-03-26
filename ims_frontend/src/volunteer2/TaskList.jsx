// src/volunteer2/TaskList.jsx
import React from "react";
import TaskCard from "./TaskCard";

const tasks = [
  {
    id: 1234,
    item: "Premium Coffee Beans",
    quantity: "3 boxes",
    recipient: "Sarah Johnson",
    phone: "+1 234-567-8900",
    due: "30 mins",
    urgency: "text-danger",
  },
  {
    id: 1235,
    item: "Organic Tea Set",
    quantity: "2 sets",
    recipient: "Michael Brown",
    phone: "+1 234-567-8901",
    due: "2 hours",
    urgency: "text-warning",
  },
];

function TaskList() {
  return (
    <div className="card shadow-sm p-3">
      <h5 className="card-title">Active Tasks</h5>
      {tasks.map((task) => (
        <TaskCard key={task.id} {...task} />
      ))}
    </div>
  );
}

export default TaskList;
