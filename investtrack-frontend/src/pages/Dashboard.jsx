import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar2 from "../components/Navbar2.jsx";

export function Dashboard() {
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const fetchPortfolio = async () => {
      const token = localStorage.getItem("angel_token");
      const clientcode = localStorage.getItem("angel_clientcode");

      if (!token || !clientcode) {
        setConnected(false);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post('http://localhost:3000/broker/angelonefetchPortfolio', {
          clientcode
        }, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.data.success && res.data.data) {
          setPortfolio(res.data.data);
          setConnected(true);
        } else {
          setConnected(false);
        }
      } catch (error) {
        console.error('Error fetching portfolio:', error);
        setConnected(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, []);

  return (
    <div className="bg-gradient-to-r from-indigo-600 to-blue-500 min-h-screen flex flex-col items-center py-4"
    style={{ paddingTop: '80px', backgroundColor: '#f0f4f8' }}>
      <Navbar2 />
      <div className="container mx-auto p-4 bg-white rounded-lg shadow-lg mt-6">
        <h1 className="text-4xl font-semibold text-center text-gray-800 mb-6">Your Portfolio</h1>

        {loading ? (
          <div className="flex justify-center items-center">
            <div className="spinner-border animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
            <p className="text-xl text-gray-500 ml-4">Loading portfolio...</p>
          </div>
        ) : connected && portfolio?.data?.holding?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio.data.holding.map((holding, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition duration-300 transform hover:scale-105"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-blue-600">{holding.tradingsymbol}</h2>
                  <p className="text-sm text-gray-500">{holding.quantity} Units</p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-600">Avg Price: <span className="font-medium text-gray-700">₹{holding.averageprice}</span></p>
                  <p className="text-gray-600">Current Price: <span className="font-medium text-gray-700">₹{holding.ltp}</span></p>
                  <p className="text-gray-600">
                    P&L: <span className={holding.pnl >= 0 ? 'text-green-600' : 'text-red-600'}>
                      ₹{holding.pnl.toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="mt-4 text-center">
                  <button className="px-4 py-2 text-white bg-blue-500 rounded-md shadow-md hover:bg-blue-600 focus:outline-none">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2" style={{marginTop: '75px'}}>No Demat Account Connected</h2>
            <p className="text-gray-600 mb-4">Please connect your Demat account to view your portfolio.</p>
            <a
              href="/addnewbroker"
              className="inline-block bg-blue-600 text-black px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
            >
              Connect Broker
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
