import mongoose from 'mongoose';

const tokenSchema = new mongoose.Schema({
  clientcode: { type: String, required: true },
  userId: { type: String, required: true, unique: true }, // user-specific key to prevent duplication
  jwttoken: String, // required fro getting portfolio
  refreshToken: String,
  feedToken: String,
  loginTime: Date,
});

export default mongoose.model('Token', tokenSchema);
