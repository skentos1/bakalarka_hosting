// middleware/optionalAuth.js
import jwt from "jsonwebtoken";

const optionalAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    // Žiadny token => anonymný užívateľ
    req.user = undefined;
    return next();
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    req.user = undefined;
    return next();
  }

  try {
    // Overíme token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    return next();
  } catch (err) {
    // Token bol poskytnutý, ale neplatný => môžeš buď:
    // 1) odoprieť prístup (res.status(403).json({ error: 'Neplatný token.' }))
    // 2) alebo pustiť ďalej ako anonym (req.user = undefined).
    // Záleží od toho, či chceš anonymovi dovoliť pokračovať.
    return res.status(403).json({ error: "Token je neplatný." });
  }
};

export default optionalAuth;
