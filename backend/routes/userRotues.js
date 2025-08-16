import express from 'express';
import { loginUser, registerUser } from '../controllers/userController.js'; // <-- added .js

const userRouter = express.Router();

// Route to register user
userRouter.post('/register', registerUser);

// Route to login user  
userRouter.post('/login', loginUser);

export default userRouter;
