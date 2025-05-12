import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";
import userRoute from "./router/user.route.js";
import brokerRouter from "./router/broker.route.js";

dotenv.config();
const app = express();

app.use(cors());
const port = 3000;
const URI = process.env.MONGODB_URI;

// Connect to MongoDB
try {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
} catch (error) {
  console.error("Error connecting to MongoDB:", error);
}

app.use(express.json());
app.use("/User", userRoute);
app.use("/broker", brokerRouter);

// News route with async function to fetch news
app.get("/news/Latestnews", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/everything", {
      params: {
        q: "finance OR stock market OR business OR sports OR cricket",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 20,
        page: 1,
        apiKey: process.env.NEWS_API,
      },
    });
    
    const articles = response.data.articles.map((article) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: article.source.name,
    }));

    res.status(200).json(articles);
  } catch (error) {
    console.error("News Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch news" });
  }
});

// Fetch Angel One Portfolio Endpoint
app.get("/broker/angelonefetchPortfolio", async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    const db = mongoose.connection.db;
    const collection = db.collection("Holdings");

    // Find user holdings by username
    const userHoldings = await collection.find({ username }).toArray();

    if (!userHoldings || userHoldings.length === 0) {
      return res.status(404).json({ success: false, message: 'No holdings found for this user' });
    }

    // Fix the mapping to correctly access the 'holdings' field.
    const formatted = userHoldings.map(entry => {
      // Assuming 'entry.holdings' directly contains the array of holdings
      return {
        broker: entry.broker,
        holdings: entry.holdings || [], // Ensure 'holdings' is an array
      };
    });

    // console.log("Holdings:", JSON.stringify(formatted, null, 2));
    // console.log("angelone holdings fetched successfully, sending to frontend");

    return res.status(200).json({
      success: true,
      message: "Holdings fetched successfully",
      data: formatted,
    });
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the portfolio",
      error: err.message,
    });
  }
});



app.get('/broker/getHoldings', async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ success: false, message: 'Username is required' });
    }

    const db = mongoose.connection.db;
    const collection = db.collection("holdings");

    // Find user holdings by username
    const userHoldings = await collection.find({ username }).toArray();

    if (!userHoldings || userHoldings.length === 0) {
      return res.status(404).json({ success: false, message: 'No holdings found for this user' });
    }

    // Fix the mapping to correctly access the 'holdings' field.
    const formatted = userHoldings.map(entry => {
      // Assuming 'entry.holdings' directly contains the array of holdings
      return {
        broker: entry.broker,
        holdings: entry.holdings || [], // Ensure 'holdings' is an array
      };
    });

    // console.log("Holdings:", JSON.stringify(formatted, null, 2));
    // console.log("Zerodha holdings fetched successfully, sending to frontend");

    return res.status(200).json({
      success: true,
      message: "Holdings fetched successfully",
      data: formatted,
    });
  } catch (err) {
    console.error("Error fetching portfolio:", err);
    return res.status(500).json({
      success: false,
      message: "An error occurred while fetching the portfolio",
      error: err.message,
    });
  }
});





app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
