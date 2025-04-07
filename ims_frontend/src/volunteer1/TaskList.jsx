import React from 'react';
import { Card, Button, Form, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faSearch } from '@fortawesome/free-solid-svg-icons';

const TaskList = ({ tasks }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <Card.Title className="mb-0">Today's Tasks</Card.Title>
          <InputGroup style={{ width: '300px' }}>
            <InputGroup.Text>
              <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control placeholder="Search tasks..." />
          </InputGroup>
        </div>

        <div className="row g-3">
          {tasks.map((task) => (
            <div className="col-12" key={task.id}>
              <Card className="border-0 shadow-sm hover-shadow">
                <Card.Body>
                  <div className="d-flex justify-content-between mb-3">
                    <div>
                      <span className="badge bg-warning text-dark">{task.status}</span>
                      <h5 className="mt-2 mb-1">{task.title}</h5>
                      <small className="text-muted">ID: #{task.id}</small>
                    </div>
                    <small className="text-muted">Assigned: {task.assigned}</small>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <h6 className="text-muted mb-2">Client Details</h6>
                      <p className="mb-1">{task.client.name}</p>
                      <p className="mb-1">{task.client.phone}</p>
                      <p className="mb-0">{task.client.address}</p>
                    </div>
                    <div className="col-md-6">
                      <h6 className="text-muted mb-2">Item Details</h6>
                      <p className="mb-1">{task.item.name}</p>
                      <p className="mb-1">Serial: {task.item.serial}</p>
                      <p className="mb-0">Category: {task.item.category}</p>
                    </div>
                  </div>

                  <div className="border-top pt-3 d-flex justify-content-between">
                    <Button variant="success" className="me-2">
                      <FontAwesomeIcon icon={faCheck} className="me-2" />
                      Verify
                    </Button>
                    <Button variant="danger">
                      <FontAwesomeIcon icon={faTimes} className="me-2" />
                      Reject
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default TaskList;