// middleware/auth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ error: "Bez tokenu, prístup zamietnutý." });
  }

  const token = authHeader.split(" ")[1]; // Očakáva sa formát "Bearer token"

  if (!token) {
    return res.status(401).json({ error: "Token nebol nájdený." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Pridaj dekódované údaje do požiadavky
    next();
  } catch (err) {
    res.status(401).json({ error: "Token nie je platný." });
  }
};

export default auth;
