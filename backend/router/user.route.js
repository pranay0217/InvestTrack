import express from 'express';
import { signup,login } from '../controller/user.controller.js';

const router = express.Router();

router.post('/signup', signup) // 👈 This tells Express to run your code when a POST request is made to /signup
router.post('/login', login)

export default router;