import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import { Footer } from '../components/footer';

export function Dashboard() {
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [broker, setBroker] = useState("Angel One");
  const [brokerLogo, setBrokerLogo] = useState("https://asset.brandfetch.io/idDA95rr8l/idok3mM_r-.jpeg");
  const navigate = useNavigate();

  const fetchPortfolio = async (clientcode, token) => {
    try {
      const res = await axios.post(
        'http://localhost:3000/broker/angelonefetchPortfolio',
        { clientcode },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          }
        }
      );

      const holdings = res.data?.data?.holdings || [];
      if (holdings.length > 0) {
        setPortfolio(holdings);
        setError(null);
      } else {
        setPortfolio([]);
        setError('No holdings found');
      }
    } catch (err) {
      console.error('Error fetching portfolio:', err);
      setPortfolio([]);
      setError('An error occurred while fetching the portfolio');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("angel_token");
    const clientcode = localStorage.getItem("angel_clientcode");

    if (!token || !clientcode) {
      setPortfolio([]);
      setError('Login required to fetch portfolio');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchPortfolio(clientcode, token);
  }, [localStorage.getItem("angel_clientcode")]); // Re-run on new clientcode

  const handleBuy = (symbol) => {
    alert(`Buy action triggered for ${symbol}`);
  };

  const handleSell = (symbol) => {
    alert(`Sell action triggered for ${symbol}`);
  };

  return (
    <>
    <div className="bg-light min-vh-100" style={{
      background: 'linear-gradient(to right, rgb(84, 110, 150), rgb(99, 129, 163))'
    }}>
      <Navbar2 />
      <div className="container py-5">
        <h1 className="text-center mb-4" style={{ marginTop: '100px', color: '#fff' }}>Your Portfolio</h1>

        {loading ? (
          <div className="text-center text-white">Loading portfolio...</div>
        ) : error ? (
          <div className="text-center text-white">{error}</div>
        ) : portfolio.length ? (
          <div className="d-flex flex-column gap-4">
            {portfolio.map((holding, idx) => (
              <div className="card shadow-sm" key={idx}>
                <div className="card-header d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img src={brokerLogo} alt={`${broker} logo`} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                    <h5 className="ms-3 mb-0">{broker}</h5>
                  </div>
                </div>
                <div className="card-body d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap">
                  <div className="me-4 mb-3 mb-md-0">
                    <h5 className="mb-1">{holding.tradingsymbol}</h5>
                    <p className="mb-1"><strong>Exchange:</strong> {holding.exchange}</p>
                    <p className="mb-1"><strong>ISIN:</strong> {holding.isin}</p>
                  </div>
                  <div className="me-4 mb-3 mb-md-0">
                    <p className="mb-1"><strong>Qty:</strong> {holding.quantity}</p>
                    <p className="mb-1"><strong>Avg:</strong> ₹{holding.averageprice}</p>
                    <p className="mb-1"><strong>LTP:</strong> ₹{holding.ltp}</p>
                    <p className="mb-1"><strong>Close:</strong> ₹{holding.close}</p>
                  </div>
                  <div className="me-4 mb-3 mb-md-0">
                    <p className={`mb-1 ${holding.profitandloss >= 0 ? "text-success" : "text-danger"}`}>
                      <strong>P&L:</strong> ₹{holding.profitandloss.toFixed(2)} ({holding.pnlpercentage}%)
                    </p>
                  </div>
                  <div>
                    <button
                      className="btn btn-outline-success btn-sm me-2"
                      onClick={() => handleBuy(holding.tradingsymbol)}
                    >
                      Buy More
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleSell(holding.tradingsymbol)}
                    >
                      Sell
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mb-4 text-white">No portfolio data found.</div>
        )}

        <div className="text-center mt-5">
          <button
            className="btn btn-primary"
            onClick={() => navigate('/addnewbroker')}
          >
            Add New Broker
          </button>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}
