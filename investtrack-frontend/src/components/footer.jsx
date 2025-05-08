import { Container, Row, Col } from 'react-bootstrap';
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
  FaEnvelope
} from 'react-icons/fa';

export function Footer() {
  return (
    <footer
      style={{
        background: 'linear-gradient(90deg, #0f2027, #203a43, #2c5364)',
        color: '#f1f1f1',
        paddingTop: '50px',
        paddingBottom: '30px',
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <Container>
        <Row className="text-center text-md-left">
          <Col md={4} className="mb-4">
            <h4 className="text-white">Invest-Track</h4>
            <p style={{ fontSize: '14px', lineHeight: '1.8' }}>
              Your intelligent partner for financial growth. Analyze, optimize, and track your investments with precision.
            </p>
          </Col>

          <Col md={4} className="mb-4">
            <h5 className="text-white">Contact</h5>
            <p style={{ fontSize: '14px' }}>
              <FaEnvelope style={{ marginRight: '10px' }} />
              contact@investtrack.com
            </p>
            <p style={{ fontSize: '14px' }}>Phone: +1 (123) 456-7890</p>
          </Col>

          <Col md={4}>
            <h5 className="text-white">Connect With Us</h5>
            <div className="d-flex justify-content-center justify-content-md-start mt-3 flex-wrap">
              {[
                { icon: <FaFacebookF />, link: 'https://facebook.com/investtrack' },
                { icon: <FaTwitter />, link: 'https://twitter.com/investtrack' },
                { icon: <FaLinkedinIn />, link: 'https://linkedin.com/company/investtrack' },
                { icon: <FaInstagram />, link: 'https://instagram.com/investtrack' },
                { icon: <FaGithub />, link: 'https://github.com/investtrack' },
              ].map(({ icon, link }, index) => (
                <a
                  key={index}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="m-2"
                  style={{
                    backgroundColor: '#ffffff22',
                    borderRadius: '50%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.3s',
                    textDecoration: 'none',
                    color: '#f1f1f1',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#00c6ff';
                    e.currentTarget.style.color = '#000';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = '#ffffff22';
                    e.currentTarget.style.color = '#f1f1f1';
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </Col>
        </Row>

        <hr style={{ backgroundColor: '#ffffff22' }} />

        <Row className="text-center">
          <Col>
            <p style={{ fontSize: '13px', marginBottom: '0' }}>
              © {new Date().getFullYear()} Invest-Track. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
