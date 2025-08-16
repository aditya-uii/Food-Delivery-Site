import express from 'express';
import multer from 'multer';
import { addFood,listFood, removeFood } from '../controllers/foodController.js';

const foodRouter = express.Router();

// Image storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '/backend/uploads'); // Ensure 'uploads' directory exists in the root directory
    },
    filename: (req, file, cb) => {
     return   cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage: storage }); // Use disk storage

// Route to add food
foodRouter.post('/add', upload.single('image'), addFood); 
foodRouter.get('/list', listFood);
foodRouter.post('/remove', removeFood);

export default foodRouter;
