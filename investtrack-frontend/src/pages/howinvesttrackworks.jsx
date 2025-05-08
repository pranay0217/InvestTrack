import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Accordion } from 'react-bootstrap';
import { FaChartLine, FaLock, FaSearch, FaUserCog, FaRobot } from 'react-icons/fa';
import Navbar from '../components/Navbar';
import { Footer } from '../components/footer';

export const HowInvestTrackWorks = () => {
  // State to manage which accordion is open
  const [activeAccordion, setActiveAccordion] = useState(null);

  // Function to handle the opening and closing of accordions
  const handleAccordionToggle = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <>
      <div
        style={{
          background: 'linear-gradient(to right, #00c6ff, #0072ff)',
          color: '#fff',
          padding: '80px 0',
          fontFamily: "'Poppins', sans-serif",
        }}
      >
        <Navbar />
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="display-4 mb-4" style={{ color: '#fff' }}>How Invest-Track Works</h2>
              <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#e0e0e0', weight:'bold'}}>
                Discover how Invest-Track helps you make smarter investment decisions with AI-powered insights, portfolio
                management, and intuitive tools. Take control of your financial future with ease.
              </p>
            </Col>
          </Row>

          <Row className="mt-5 text-center">
            <Col md={4}>
              <Card className="shadow-lg border-0" style={{ background: '#1f1f2f', borderRadius: '15px' }}>
                <Card.Body>
                  <FaChartLine size={50} style={{ color: '#00c6ff', marginTop: '20px' }} />
                  <Card.Title className="mt-4" style={{ color: '#fff' }}>Track Your Investments</Card.Title>
                  <Card.Text style={{ fontSize: '16px', color: '#e0e0e0' }}>
                    Stay on top of your investment portfolio with real-time data, market analysis, and personalized updates.
                  </Card.Text>
                  <Button 
                    variant="outline-light" 
                    className="mt-3" 
                    onClick={() => handleAccordionToggle(1)}
                    style={{ borderRadius: '20px' }}
                  >
                    Learn More
                  </Button>

                  <Accordion activeKey={activeAccordion === 1 ? '1' : null}>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>Track Your Investments - Details</Accordion.Header>
                      <Accordion.Body>
                        With Invest-Track, you can easily monitor and manage your investments across various assets. Real-time data keeps you informed, and personalized notifications alert you to significant portfolio movements.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-lg border-0" style={{ background: '#1f1f2f', borderRadius: '15px' }}>
                <Card.Body>
                  <FaLock size={50} style={{ color: '#00c6ff', marginTop: '20px' }} />
                  <Card.Title className="mt-4" style={{ color: '#fff' }}>Secure & Reliable</Card.Title>
                  <Card.Text style={{ fontSize: '16px', color: '#e0e0e0' }}>
                    Invest-Track ensures the highest level of security for your data and portfolio, giving you peace of mind.
                  </Card.Text>
                  <Button 
                    variant="outline-light" 
                    className="mt-3" 
                    onClick={() => handleAccordionToggle(2)}
                    style={{ borderRadius: '20px' }}
                  >
                    Learn More
                  </Button>

                  <Accordion activeKey={activeAccordion === 2 ? '2' : null}>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>Security Details</Accordion.Header>
                      <Accordion.Body>
                        Invest-Track uses end-to-end encryption and secure authentication to ensure your financial data remains private. We prioritize your privacy and ensure secure data storage.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-lg border-0" style={{ background: '#1f1f2f', borderRadius: '15px' }}>
                <Card.Body>
                  <FaSearch size={50} style={{ color: '#00c6ff', marginTop: '20px' }} />
                  <Card.Title className="mt-4" style={{ color: '#fff' }}>Smart Recommendations</Card.Title>
                  <Card.Text style={{ fontSize: '16px', color: '#e0e0e0' }}>
                    Get AI-based stock and mutual fund recommendations tailored to your risk appetite and investment goals.
                  </Card.Text>
                  <Button 
                    variant="outline-light" 
                    className="mt-3" 
                    onClick={() => handleAccordionToggle(3)}
                    style={{ borderRadius: '20px' }}
                  >
                    Learn More
                  </Button>

                  <Accordion activeKey={activeAccordion === 3 ? '3' : null}>
                    <Accordion.Item eventKey="3">
                      <Accordion.Header>AI Recommendations</Accordion.Header>
                      <Accordion.Body>
                        Our AI technology analyzes your portfolio and market trends to give you personalized recommendations on stocks and mutual funds, optimizing for risk and return.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5 text-center">
            <Col>
              <h3 className="display-4 text-white">Key Features</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#e0e0e0' }}>
                Invest-Track empowers investors with features that take the guesswork out of investment decisions.
              </p>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={4}>
              <Card className="shadow-lg border-0" style={{ background: '#2c2c3e', borderRadius: '15px' }}>
                <Card.Body>
                  <FaUserCog size={50} style={{ color: '#00c6ff' }} />
                  <Card.Title className="mt-4" style={{ color: '#fff' }}>Personalized Dashboard</Card.Title>
                  <Card.Text style={{ fontSize: '16px', color: '#e0e0e0' }}>
                    A user-friendly dashboard that offers personalized views of your portfolio, analytics, and more.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-lg border-0" style={{ background: '#2c2c3e', borderRadius: '15px' }}>
                <Card.Body>
                  <FaRobot size={50} style={{ color: '#00c6ff' }} />
                  <Card.Title className="mt-4" style={{ color: '#fff' }}>AI-Powered Insights</Card.Title>
                  <Card.Text style={{ fontSize: '16px', color: '#e0e0e0' }}>
                    Our AI technology provides actionable insights based on your investment history and market trends.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="shadow-lg border-0" style={{ background: '#2c2c3e', borderRadius: '15px' }}>
                <Card.Body>
                  <FaLock size={50} style={{ color: '#00c6ff' }} />
                  <Card.Title className="mt-4" style={{ color: '#fff' }}>Data Privacy & Security</Card.Title>
                  <Card.Text style={{ fontSize: '16px', color: '#e0e0e0' }}>
                    We prioritize the security of your data, ensuring all transactions and personal information remain secure.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5 text-center">
            <Col>
              <h3 className="display-4 text-white">Ready to Get Started?</h3>
              <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#e0e0e0' }}>
                Join Invest-Track today to start optimizing your investment strategy and maximizing your financial growth.
              </p>
              <Button
                variant="outline-light"
                size="lg"
                className="mt-4"
                href="/signup"
                style={{
                  background: '#00c6ff',
                  borderRadius: '30px',
                  fontSize: '18px',
                  padding: '15px 35px',
                }}
              >
            Sign Up Now
          </Button>
        </Col>
      </Row>
    </Container>
  </div>
  <Footer />
</>
  )};
