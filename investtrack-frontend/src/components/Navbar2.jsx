import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate, NavLink } from 'react-router-dom';
import logout from './logout';

function SidebarWithNavbar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setShow(!show);

  const username = localStorage.getItem('Users')
    ? JSON.parse(localStorage.getItem('Users')).name
    : '';

  const handleLogout = () => {
    logout();
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <>
      <Navbar
        bg="dark"
        variant="dark"
        expand="lg"
        style={{
          justifyContent: 'center',
          marginTop: '30px',
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Container fluid>
          {/* Left-aligned profile section */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Clickable Circular Profile Picture */}
            <div
              onClick={handleProfileClick}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                border: '2px solid #ccc',
                cursor: 'pointer',
              }}
              title="Go to Profile"
            >
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                {username ? username.charAt(0).toUpperCase() : ''}
              </span>
            </div>

            {/* Static name label (non-clickable) */}
            <Navbar.Text style={{ color: 'white' }}>
              {username ? username : 'Guest'}
            </Navbar.Text>
          </div>

          {/* App Title */}
          <h1 style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', marginTop: '10px' }}>
            INVEST-TRACK
          </h1>

          {/* Sidebar Toggle Button */}
          <Button
            variant="outline-light"
            onClick={toggleSidebar}
            style={{
              border: '1px solid #ccc',
              padding: '0.4rem 0.7rem',
            }}
          >
            &#9776;
          </Button>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={toggleSidebar} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={NavLink} to="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/addnewbroker">Add New Broker</Nav.Link>
            <Nav.Link as={NavLink} to="/AI-assistant">AI Assistance</Nav.Link>
            <Nav.Link as={NavLink} to="/Contact">Contact</Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/"
              onClick={handleLogout}
              style={{ color: 'red', fontWeight: 'bold' }}
            >
              Logout
            </Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SidebarWithNavbar;
