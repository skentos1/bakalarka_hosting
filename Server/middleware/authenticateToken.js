// server/middleware/authenticateToken.js
import jwt from "jsonwebtoken";

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Token nie je prítomný.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token je neplatný.' });
    console.log('Decoded Token:', user); // Debugging: Skontrolujte obsah tokenu
    req.user = user; // Priraďujeme celý objekt user
    next();
  });
}

export default authenticateToken;
