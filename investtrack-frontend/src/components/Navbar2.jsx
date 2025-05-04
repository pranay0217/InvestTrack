import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { useNavigate, NavLink } from 'react-router-dom'; // Import NavLink for React Router navigation
import logout from './logout' ;// Importing the logout function to handle user logout

function SidebarWithNavbar() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setShow(!show);
  
  // Fixing the localStorage retrieval error
  const username = localStorage.getItem('Users') ? JSON.parse(localStorage.getItem('Users')).name : '';
  
  const handleLogout = () => {
    logout(); // logout functionality to clear user data
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
          {/* Left-aligned section containing profile image */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Circular Frame for Profile Picture */}
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: '10px',
                border: '2px solid #ccc', // optional border for the frame
              }}
            >
              {/* Placeholder for the user's profile picture or initial */}
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>
                {username ? username.charAt(0).toUpperCase() : ''}
              </span>
            </div>
            <Navbar.Brand href="/profile">{username ? username : 'Guest'}</Navbar.Brand>
          </div>
           <h1 style={{color: 'white', fontWeight: 'bold', fontFamily: 'Roboto, sans-serif', marginTop:'10px'}}>INVEST-TRACK</h1>
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
            {/* Using NavLink for React Router navigation */}
            <Nav.Link as={NavLink} to="/Dashboard">Dashboard</Nav.Link>
            <Nav.Link as={NavLink} to="/addnewbroker">Add New Broker</Nav.Link>
            <Nav.Link as={NavLink} to="/AI-assistant">AI Assistance</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/" // to redirect user to home page after user clicks logout button
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
