import axios from 'axios';
import Token from '../model/token.model.js';
import dotenv from 'dotenv';
import { totp } from 'otplib';

dotenv.config();

// ✅ Ensure that TOTP secret is set in your .env file
const totpSecret = process.env.TOTP_SECRET; 

// ✅ Angel One Login Controller
export const angelonelogin = async (req, res) => {
  const { clientcode, password, state } = req.body;

  // Validate the required fields
  if (!clientcode || !password || !state) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields (clientcode, password, state)',
    });
  }

  // Generate OTP using the secret key
  const otp = totp.generate(totpSecret); 

  const loginData = {
    clientcode,
    password,
    totp: otp,
    state : 'web',
  };

  try {
    // Log request headers for debugging purposes
    console.log("Login Request Data:", loginData);

    const response = await axios.post(
      'https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword',
      loginData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserType': 'USER',
          'X-SourceID': 'WEB',
          'X-ClientLocalIP': process.env.LOCAL_IP_ADDRESS || '127.0.0.1',  // Use fallback localhost IP
          'X-ClientPublicIP': process.env.PUBLIC_IP_ADDRESS || '127.0.0.1', // Use fallback IP
          'X-MACAddress': process.env.MAC_ADDRESS || '00:00:00:00:00:00',  // Use fallback MAC address
          'X-PrivateKey': process.env.ANGEL_API_KEY, // Ensure API Key is available in your .env
        },
      }
    );

    const { data } = response;

    // ✅ Check if login is successful before storing tokens
    if (data.status && data.status.toLowerCase() === 'success') {
      await Token.findOneAndUpdate(
        { clientcode },
        {
          clientcode,
          token: data.data.jwtToken,
          refreshToken: data.data.refreshToken,
          feedToken: data.data.feedToken,
          loginTime: new Date(),
        },
        { upsert: true, new: true }
      );

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token: data.data.jwtToken,
      });
    } else {
      return res.status(401).json({
        success: false,
        message: data.message || 'Login failed at Angel One',
      });
    }
  } catch (err) {
    // Debugging: Log the error details
    console.error('Angel One Login Error:', err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: err.response?.data || err.message,
    });
  }
};

// ✅ Angel One Portfolio Fetch Controller
export const angelonefetchPortfolio = async (req, res) => {
  const { clientcode } = req.body;

  if (!clientcode) {
    return res.status(400).json({
      success: false,
      message: 'Missing clientcode',
    });
  }

  try {
    const userToken = await Token.findOne({ clientcode });

    if (!userToken || !userToken.token) {
      return res.status(401).json({
        success: false,
        message: 'Token not found. Please login first.',
      });
    }

    const response = await axios.get(
      'https://apiconnect.angelone.in/rest/secure/angelbroking/portfolio/v1/getHolding',
      {
        headers: {
          'Authorization': `Bearer ${userToken.token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserType': 'USER',
          'X-SourceID': 'WEB',
          'X-ClientLocalIP': process.env.LOCAL_IP_ADDRESS || '127.0.0.1',  // Use fallback localhost IP
          'X-ClientPublicIP': process.env.PUBLIC_IP_ADDRESS || '127.0.0.1', // Use fallback IP
          'X-MACAddress': process.env.MAC_ADDRESS || '00:00:00:00:00:00',  // Use fallback MAC address
          'X-PrivateKey': process.env.ANGEL_API_KEY, // Ensure API Key is available in your .env
        },
      }
    );

    console.log('Portfolio Data:', JSON.stringify(response.data));

    if (response.status === 200) {
      // ✅ Forward portfolio to FastAPI for analysis
      await axios.post('http://localhost:8000/InvestTrack/ml_model.py', { // Corrected endpoint
        portfolio: response.data,
      });

      return res.status(200).json({
        success: true,
        data: response.data,
      });
    } else {
      return res.status(response.status).json({
        success: false,
        message: 'Failed to fetch portfolio',
      });
    }
  } catch (err) {
    // Debugging: Log the error details
    console.error('Fetch Portfolio Error:', err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio',
      error: err.response?.data || err.message,
    });
  }
};
