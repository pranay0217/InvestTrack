import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar2 from '../components/Navbar2';
import { Footer } from '../components/footer';

export function Dashboard() {
  const [zerodhaHoldings, setZerodhaHoldings] = useState([]);
  const [angelHoldings, setAngelHoldings] = useState([]);
  const [activeTab, setActiveTab] = useState('zerodha');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchAllHoldings = async () => {
    try {
      setLoading(true);
      const userData = localStorage.getItem('Users');
      const parsedUser = JSON.parse(userData);
      const username = parsedUser.name;

      // Fetch Zerodha Holdings
      const zerodhaRes = await axios.get(`http://localhost:3000/broker/getHoldings?username=${username}`);
      if (zerodhaRes.data?.success && Array.isArray(zerodhaRes.data.data)) {
        const zerodhaData = zerodhaRes.data.data.find(b => b.broker?.toLowerCase() === 'zerodha');
        setZerodhaHoldings(zerodhaData?.holdings || []);
      }

      // Fetch Angel One Holdings
      const angelRes = await axios.get(`http://localhost:3000/broker/angelonefetchportfolio?username=${username}`);
      console.log('Angel One Response:', angelRes.data); // Log the response for debugging

      if (angelRes.data?.success) {
        // Now correctly accessing the holdings data from the Angel One response structure
        const angelData = angelRes.data.data[0];
        console.log("angel data: ",angelData?.holdings)  // First (and only) element in the 'data' array
        setAngelHoldings(angelData?.holdings || []);
      } else {
        console.error('Angel One API did not return success');
        setAngelHoldings([]);
      }
    } catch (err) {
      console.error('Error fetching holdings:', err);
      setAngelHoldings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllHoldings();
  }, []);

  const handleBuy = symbol => alert(`Buy action triggered for ${symbol}`);
  const handleSell = symbol => alert(`Sell action triggered for ${symbol}`);

  const renderZerodhaHoldings = (holdings) => (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        {holdings.map((holding, idx) => (
          <div className="d-flex justify-content-between align-items-center border-bottom py-2" key={idx}>
            <div>
              <h5>{holding.tradingsymbol}</h5>
              <p><strong>Quantity:</strong> {holding.quantity}</p>
              <p><strong>Avg Price:</strong> ₹{holding.average_price || 'N/A'}</p>
            </div>
            <div>
              <p><strong>P&L:</strong> ₹{holding.pnl || 'N/A'}</p>
              <p><strong>LTP:</strong> ₹{holding.ltp || 'N/A'}</p>
            </div>
            <div>
              <p><strong>Current Price:</strong> ₹{holding.last_price || 'N/A'}</p>
              <p><strong>Exchange:</strong> {holding.exchange || 'N/A'}</p>
            </div>
            <div>
              <button className="btn btn-outline-success btn-sm me-2" onClick={() => handleBuy(holding.tradingsymbol)}>Buy</button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => handleSell(holding.tradingsymbol)}>Sell</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAngelOneHoldings = (holdings) => {
    return (
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          {holdings.map((holding, idx) => (
            <div className="d-flex justify-content-between align-items-center border-bottom py-2" key={idx}>
              <div>
                <h5>{holding.tradingsymbol || holding.symbol || 'N/A'}</h5>
                <p><strong>Quantity:</strong> {holding.quantity || holding.qty || 'N/A'}</p>
                <p><strong>Avg Price:</strong> ₹{holding.averageprice || holding.avgprice || 'N/A'}</p>
              </div>
              <div>
                <p><strong>P&L:</strong> ₹{holding.profitandloss || holding.pnl || 'N/A'}</p>
                <p><strong>LTP:</strong> ₹{holding.ltp || holding.lastprice || 'N/A'}</p>
              </div>
              <div>
                <button className="btn btn-outline-success btn-sm me-2" onClick={() => handleBuy(holding.tradingsymbol || holding.symbol)}>Buy</button>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleSell(holding.tradingsymbol || holding.symbol)}>Sell</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="bg-light min-vh-100" style={{ background: 'linear-gradient(to right, rgb(84, 110, 150), rgb(99, 129, 163))' }}>
        <Navbar2 />
        <div style={{ marginTop: '120px' }} />

        <div className="container">
          <ul className="nav nav-pills justify-content-center mb-4">
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'zerodha' ? 'active' : ''}`} onClick={() => setActiveTab('zerodha')}>
                Zerodha
              </button>
            </li>
            <li className="nav-item">
              <button className={`nav-link ${activeTab === 'angelone' ? 'active' : ''}`} onClick={() => setActiveTab('angelone')}>
                Angel One
              </button>
            </li>
          </ul>

          {loading ? (
            <p className="text-white text-center">Loading data...</p>
          ) : activeTab === 'zerodha' ? (
            zerodhaHoldings.length > 0 ? (
              renderZerodhaHoldings(zerodhaHoldings)
            ) : (
              <p className="text-white text-center">
                No Zerodha data found.
                <button className="btn btn-sm btn-warning ms-2" onClick={() => navigate('/addnewbroker')}>
                  Connect Zerodha
                </button>
              </p>
            )
          ) : angelHoldings.length > 0 ? (
            renderAngelOneHoldings(angelHoldings)
          ) : (
            <p className="text-white text-center">
              No Angel One data found.
              <button className="btn btn-sm btn-warning ms-2" onClick={() => navigate('/addnewbroker')}>
                Connect Angel One
              </button>
            </p>
          )}

          <div className="text-center my-5">
            <button className="btn btn-primary" onClick={() => navigate('/addnewbroker')}>Add New Broker</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
