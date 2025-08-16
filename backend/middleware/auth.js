import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    // console.log('All headers:', req.headers);

    const token = req.headers.authorization?.split(' ')[1] || req.headers.token;


    // console.log('Extracted token:', token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach full decoded token (with id, email, etc.)
        next();
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(401).json({ success: false, message: 'Unauthorized access' });
    }
};

export default authMiddleware;
