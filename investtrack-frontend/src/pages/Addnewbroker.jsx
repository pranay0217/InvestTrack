import React, { useState } from 'react';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';

const brokers = [
  {
    name: "Angel One",
    description: "Trade with India's leading stock broker",
    logo: "https://asset.brandfetch.io/idDA95rr8l/idok3mM_r-.jpeg",
    connectable: true,
  },
  {
    name: "Zerodha",
    description: "Invest in stocks and mutual funds",
    logo: "https://zerodha.com/static/images/logo.svg",
    connectable: false,
  },
  {
    name: "Groww",
    description: "Simple investing in stocks and mutual funds",
    logo: "https://groww.in/favicon.ico",
    connectable: false,
  },
];

export const Addnewbroker = () => {
  const [selectedBroker, setSelectedBroker] = useState(null);
  const [formData, setFormData] = useState({
    clientcode: '',
    password: '',
    totp: '',
    state: 'web'
  });
  const [isConnected, setIsConnected] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleConnectClick = (broker) => {
    if (broker.name === "Angel One") {
      setSelectedBroker(broker);
    } else {
      alert(`${broker.name} integration is coming soon!`);
    }
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/broker/angelonelogin', formData);

      if (res.data.success) {
        alert('Login successful! Token: ' + res.data.token);
        setIsConnected(true);
        localStorage.setItem("angel_token", res.data.token);
        localStorage.setItem("angel_clientcode", formData.clientcode);
      } else {
        alert('Login failed: ' + (res.data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Login failed: ' + (err.response ? err.response.data.message : err.message));
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column" style={{
      background: 'linear-gradient(to right,rgb(84, 110, 150),rgb(99, 129, 163))',
      backgroundSize: 'cover',
      backgroundImage: 'url("https://www.google.com/imgres?q=background%20image%20for%20adding%20stocks&imgurl=https%3A%2F%2Fpic.pikbest.com%2F02%2F14%2F91%2F925888piCjDw.jpg!sw800&imgrefurl=https%3A%2F%2Fpikbest.com%2Fvideo%2Fstock-market-stock-investment-4k-hd-background-video_6007012.html&docid=Wt21mCDUAqDMMM&tbnid=8DpbCnWQr0Zw5M&vet=12ahUKEwjqyoXNzomNAxWnUGwGHZ4mFjAQM3oECHEQAA..i&w=800&h=450&hcb=2&ved=2ahUKEwjqyoXNzomNAxWnUGwGHZ4mFjAQM3oECHEQAA")',
    }}>
      <Navbar2 />
      <div className="flex-grow-1 d-flex justify-content-center align-items-center flex-column p-3">
        <div className="container">
          <h2 className="mb-4 text-center" >Connect Your Broker</h2>
          <div className="row justify-content-center">
            {brokers.map((broker, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <div className="card h-100 text-center shadow-sm">
                  <img
                    src={broker.logo}
                    alt={broker.name}
                    style={{
                      maxWidth: '100px',
                      maxHeight: '60px',
                      objectFit: 'contain',
                      marginTop: '20px'
                    }}
                    className="mx-auto"
                  />
                  <div className="card-body">
                    <h5>{broker.name}</h5>
                    <p>{broker.description}</p>
                    {broker.connectable ? (
                      <button className="btn btn-primary" onClick={() => handleConnectClick(broker)}>
                        {isConnected ? 'Connected' : 'Connect'}
                      </button>
                    ) : (
                      <button className="btn btn-secondary" disabled>Coming Soon</button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {selectedBroker && (
            <div className="mt-5">
              <h4 className="text-center">Login to {selectedBroker.name}</h4>
              <form onSubmit={handleSubmit} className="p-4 border rounded bg-light mx-auto shadow" style={{ maxWidth: "500px" }}>
                <div className="mb-3">
                  <input 
                    inputtype="text" 
                    placeholder="Clientcode" 
                    name='clientcode' 
                    className="form-control" 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                <div className="mb-3 position-relative">
                  <input 
                    inputtype="password" 
                    placeholder='Password' 
                    name="password" 
                    className="form-control" 
                    onChange={handleInputChange} 
                    type={passwordVisible ? 'text' : 'password'} 
                    required
                  />
                  <button
                    type="button"
                    className="btn position-absolute top-50 end-0 translate-middle-y"
                    style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    onClick={() => setPasswordVisible(!passwordVisible)}
                  >
                    <i className={`fas ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'}`} />
                  </button>
                </div>
                <div className="mb-3">
                  <input 
                    inputtype="text" 
                    placeholder='State (Optional)' 
                    name="state" 
                    className="form-control" 
                    onChange={handleInputChange} 
                  />
                </div>
                <button className="btn btn-success w-100" type="submit">Submit</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
