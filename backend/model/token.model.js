// models/Token.js
import mongoose from "mongoose";
const tokenSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
  feedToken: {type: String},
  loginTime: {type: Date}
},{timestamps: true});

const Token = mongoose.model("Token", tokenSchema);
export default Token;