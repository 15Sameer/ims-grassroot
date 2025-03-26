import React from 'react';
import GrassrootLogo from "../assets/images/Grassroot.png";
import { Navbar, Nav, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

const AppHeader = () => {
  return (
    <Navbar bg="white" expand="sm" className="shadow-sm px-3">
      <Navbar.Brand href="#">
        <img src={GrassrootLogo} alt="Logo" className="me-3" style={{ height: "40px", width: "auto" }} />
      </Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" active>New Tasks</Nav.Link>
          <Nav.Link href="#">Verified</Nav.Link>
          <Nav.Link href="#">Rejected</Nav.Link>
        </Nav>
        
        <div className="d-flex align-items-center">
          <span className="me-3 text-muted">John Smith</span>
          <Button variant="primary">
            <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
            Logout
          </Button>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default AppHeader;