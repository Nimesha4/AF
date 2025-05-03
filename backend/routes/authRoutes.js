import express from 'express';
import { loginUser, registerUser } from '../Controller/authController.js'; // Correct import

const router = express.Router();

router.post('/register', registerUser); // Correct handler for register
router.post('/login', loginUser); // Correct handler for login

export default router;
