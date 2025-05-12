import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

export const ZerodhaCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);  // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    const handleZerodhaLogin = async () => {
      try {
        const urlParams = new URLSearchParams(location.search);
        const request_token = urlParams.get('request_token');

        const userData = localStorage.getItem("Users");
        const parsedUser = JSON.parse(userData);
        const username = parsedUser.name;

        if (!request_token) {
          alert('Missing request token.');
          setLoading(false);
          return navigate('/Addnewbroker');
        }

        // Send request token to the backend for validation
        const res = await axios.post('http://localhost:3000/broker/zerodhalogin', {
          request_token, username
        });

        const { success, access_token, refresh_token, message } = res.data;

        if (success && access_token) {
          localStorage.setItem('zerodha_token', access_token);
          alert('Zerodha login successful!');
          setLoading(false);
          return navigate('/Dashboard');
        } else {
          // If success is false or access_token is not present
          alert('Zerodha login failed: ' + (message || 'Unknown error'));
          setLoading(false);
          return navigate('/Addnewbroker');
        }
      } catch (error) {
        // Catch any errors during the API call
        setError('An error occurred during Zerodha login: ' + error.message);
        setLoading(false);
        return navigate('/Addnewbroker');
      }
    };

    handleZerodhaLogin();
  }, [location, navigate]);

  if (loading) {
    return <div className="text-center mt-5">Processing Zerodha login...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">{error}</div>;
  }

  return null;
};
