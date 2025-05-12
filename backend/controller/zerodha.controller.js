import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";
import Holdings from "../model/Holdings.js";

dotenv.config();

const ZERODHA_API_KEY = process.env.ZERODHA_API_KEY;
const ZERODHA_API_SECRET = process.env.ZERODHA_API_SECRET;

const kite = new KiteConnect({ api_key: ZERODHA_API_KEY });

export const zerodhalogin = async (req, res) => {
  const { request_token, username } = req.body;

  if (!request_token || !username) {
    return res.status(400).json({ success: false, message: "Missing request_token or username" });
  }

  try {
    const session = await kite.generateSession(request_token, ZERODHA_API_SECRET);
    const { access_token } = session;
    kite.setAccessToken(access_token);

    // Fetch fresh holdings
    const holdings = await kite.getHoldings();

    // Update the database by overwriting the existing holdings for the user and broker
    await Holdings.findOneAndUpdate(
      { username, broker: "zerodha" },
      {
        $set: {
          holdings,           // replace entire holdings array
          updatedAt: new Date()
        }
      },
      { upsert: true, new: true }
    );

    res.json({
      success: true,
      access_token,
      message: "Zerodha login & holdings updated successfully!",
    });

  } catch (error) {
    console.error("Zerodha login error:", error.message || error);
    res.status(500).json({ success: false, message: "Zerodha login failed" });
  }
};
