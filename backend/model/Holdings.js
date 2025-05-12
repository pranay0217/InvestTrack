// models/Holdings.js
import mongoose from 'mongoose';

const HoldingsSchema = new mongoose.Schema({
  username: String,
  broker: String, // e.g. 'zerodha' or 'angelone'
  holdings: Object,
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Holdings', HoldingsSchema);
