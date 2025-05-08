import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Footer } from '../components/footer';

export function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to API or email)
    alert('Your message has been sent!');
  };

  return (
    <>
    <Container fluid className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Row className="justify-content-center">
        <Col md={6} className="bg-white p-5 rounded shadow">
          <h2 className="text-center mb-4">Contact Us</h2>
          <p className="text-center text-muted">
            We would love to hear from you! Please fill out the form below and we will get back to you as soon as possible.
          </p>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formEmail" className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group controlId="formMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Enter your message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
    <Footer/>
    </>
  );
}
