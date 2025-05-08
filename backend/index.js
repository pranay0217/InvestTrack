import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
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

// Fetch Angel One Portfolio Endpoint
app.post("/broker/angelonefetchPortfolio", async (req, res) => {
  const { clientcode } = req.body;

  if (!clientcode) {
    return res.status(400).json({
      success: false,
      message: "Missing clientcode",
    });
  }

  console.log("Fetching portfolio for clientcode:", clientcode);

  try {
    const db = mongoose.connection.db;
    const collection = db.collection("all_holdings"); // your actual collection

    const portfolio = await collection.findOne({ clientcode });

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    // Extract only the holdings array
    const holdings = portfolio.holdings;

    // Optional: Log the holdings array
    console.log("Holdings:", JSON.stringify(holdings, null, 2));

    return res.status(200).json({
      success: true,
      message: "Portfolio fetched successfully",
      data: holdings, // Send only the holdings array
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
