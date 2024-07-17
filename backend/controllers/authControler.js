import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "../config.js";

// Function to generate a random numeric ID
const generateNumericId = (length = 10) => {
    return Math.floor(Math.random() * (9 * Math.pow(10, length - 1))) + Math.pow(10, length - 1);
};

const getOrCreateProfile = (req, res) => {
    let token = req.cookies.token;
    
    if (!token) {
        // Create a new token with a numeric ID if it doesn't exist
        const userId = generateNumericId();
        token = jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
        res.cookie('token', token, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 }); // 30 days
    }
    
    jwt.verify(token, JWT_SECRET, {}, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }
        res.json(user);
    });
};

export { getOrCreateProfile };