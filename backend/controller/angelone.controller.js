import axios from 'axios';
import Token from '../model/token.model.js'; // Your token model
import dotenv from 'dotenv';

dotenv.config();

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000;

// Exponential Backoff function for retries
const exponentialBackoff = async (url, options, retries = MAX_RETRIES, delay = RETRY_DELAY) => {
  let attempt = 0;
  while (attempt < retries) {
    try {
      const response = await axios(url, options);
      return response;
    } catch (error) {
      attempt++;
      if (error.response && error.response.status === 429) { // Rate-limit (429)
        const backoffTime = delay * Math.pow(2, attempt); // Exponential backoff
        console.log(`Rate limit exceeded. Retrying in ${backoffTime / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, backoffTime));
      } else {
        throw error;
      }
    }
  }
  throw new Error('Max retries reached');
};

// Login Function
export const angelonelogin = async (req, res) => {
  const { clientcode, pin, totp } = req.body;

  if (!clientcode || !pin || !totp) {
    return res.status(400).json({
      success: false,
      message: 'Missing required fields (clientcode, pin, totp)',
    });
  }

  const loginData = {
    clientcode,
    password: pin,
    totp,
    state: 'web',
  };

  try {
    console.log("Sending login request:", loginData);

    const response = await exponentialBackoff(
      'https://apiconnect.angelone.in/rest/auth/angelbroking/user/v1/loginByPassword',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-UserType': 'USER',
          'X-SourceID': 'WEB',
          'X-ClientLocalIP': process.env.LOCAL_IP_ADDRESS || '127.0.0.1',
          'X-ClientPublicIP': process.env.PUBLIC_IP_ADDRESS || '127.0.0.1',
          'X-MACAddress': process.env.MAC_ADDRESS || '00:00:00:00:00:00',
          'X-PrivateKey': process.env.ANGEL_API_KEY,
        },
        data: loginData
      }
    );

    const data = response.data;

    if (data.status === true && data.message === "SUCCESS" && data.data?.jwtToken) {
      const token = data.data.jwtToken;

      await Token.findOneAndUpdate(
        { userId: clientcode },
        {
          clientcode,
          userId: clientcode,
          token,
          refreshToken: data.data.refreshToken,
          feedToken: data.data.feedToken,
          loginTime: new Date(),
        },
        { upsert: true, new: true }
      );

      // Notify FastAPI server
      try {
        await axios.post('http://localhost:8000/fetch_portfolio', {
          clientcode,
          token,
        });
        console.log('Sent clientcode and token to FastAPI backend.');
      } catch (fastapiErr) {
        console.error('Failed to notify FastAPI:', fastapiErr.message);
      }

      return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Login failed',
        response: data,
      });
    }
  } catch (err) {
    console.error('Login Request Error:', err.response?.data || err.message);
    return res.status(500).json({
      success: false,
      message: 'Login failed',
      error: err.response?.data || err.message,
    });
  }
};
