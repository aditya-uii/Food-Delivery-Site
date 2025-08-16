import express from 'express';
import { addToCart, getCarts,  removeFormCart } from '../controllers/cartController.js';
import   authMiddleware from '../middleware/auth.js';

const cartRouter = express.Router();

// Route to add an item to the cart
cartRouter.post('/add', authMiddleware, addToCart);
// Route to remove an item from the cart
cartRouter.post('/remove',authMiddleware, removeFormCart);
// Route to get all items in the cart
cartRouter.post('/getCart',authMiddleware, getCarts);

export default cartRouter;