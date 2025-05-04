import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"
import userRoute from "./router/user.route.js"
import brokerRouter from "./router/broker.route.js"

dotenv.config()
const app = express()

app.use(cors())
const port = process.env.PORT || 3001;
const URI = process.env.MONGODB_URI;

//connect to mongodb
try{
    mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => console.log("MongoDB connected"))
      .catch(err => console.error("MongoDB connection error:", err));
} catch (error) {
    console.error("Error connecting to MongoDB:", error);
}

app.use(express.json())
app.use("/User", userRoute); // Sends all the request to the /User are directed to the user.route.js where we have /signup and /login connected
app.use("/broker", brokerRouter);// Sends all the request to the /broker are directed to the broker.route.js where we have /signup and /login connected

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
