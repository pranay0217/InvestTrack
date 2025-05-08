import express from 'express';
import { angelonelogin} from '../controller/angelone.controller.js';

const brokerRouter = express.Router();

brokerRouter.post('/angelonelogin', angelonelogin) // 👈 This tells Express to run your code when a POST request is made to /angelonelogin
// brokerRouter.post('/angelonefetchPortfolio', angelonefetchPortfolio) // 👈 This tells Express to run your code when a POST request is made to /angelonefetchPortfolio

export default brokerRouter;