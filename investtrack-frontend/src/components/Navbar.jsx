import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authProvider';

function NavScrollExample() {
 
  const { authUser } = useAuth(); // Accessing the authentication context to get the authUser state
  const navigate = useNavigate();

  return (
    <Navbar expand="lg" className="bg-body-tertiary" style={{ justifyContent:'center', marginTop: "30px" ,position: "fixed", top: 0, width: "100%", zIndex: 1, display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <Container fluid style={{ display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Navbar.Brand href="/" style={{ marginLeft: '60px',fontWeight: 'bold', fontSize: '24px', fontFamily: 'Roboto, sans-serif' }}>Invest Track</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="#action1" style={{ marginLeft: '400px',marginRight: '10px', justifyContent: 'flex-start' }}> How InvestTrack Works </Nav.Link>
            <Nav.Link onClick={() => navigate('/AIassistant')} style={{ marginRight: '10px' }}>AI Assistant</Nav.Link>
            <Nav.Link onClick={() => navigate('/ContactUs')} style={{ marginRight: '10px' }}>Contact Us</Nav.Link>
          </Nav>
          <Button variant="outline-success" onClick={() => navigate('/login')} style={{ marginRight: '10px', border: "2px solid lightblue"}}>Log In</Button>
          <Button variant="outline-success" onClick={() => navigate('/learn-more')} style={{ marginRight: '60px', backgroundColor: 'lightblue' }}>Learn More</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;