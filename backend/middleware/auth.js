const jwt = require('jsonwebtoken');

// Middleware to authenticate requests
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Assumes "Bearer TOKEN"
    
    // Check if token is provided
    if (!token) {
        return res.status(403).json({ message: 'Token is required.' });
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }
        req.userId = decoded.id; // Set userId from the token payload
        next(); // Proceed to the next middleware
    })
}

module.exports = verifyToken
