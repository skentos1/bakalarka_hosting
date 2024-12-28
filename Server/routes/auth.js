// routes/auth.js
import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authenticateToken from '../middleware/authenticateToken.js'
const router = express.Router();

// Registrácia používateľa
router.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Základná validácia
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Všetky polia sú povinné." });
  }

  try {
    // Skontroluj, či už používateľ existuje
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "Email je už používaný." });
    }

    // Hashovanie hesla
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Vytvorenie nového používateľa
    const newUser = new User({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "Používateľ úspešne zaregistrovaný." });
  } catch (error) {
    console.error("Chyba pri registrácii:", error.message);
    res.status(500).json({ error: "Chyba servera počas registrácie." });
  }
});

// Login používateľa
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Základná validácia
  if (!email || !password) {
    return res.status(400).json({ error: "Email a heslo sú povinné." });
  }

  try {
    // Nájde používateľa podľa emailu
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ error: "Neplatný email alebo heslo." });
    }

    // Porovnanie hesla
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Neplatný email alebo heslo." });
    }

    // Generovanie JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Prihlásenie úspešné.",
      token, // Token poslaný klientovi
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Chyba pri prihlasovaní:", error.message);
    res.status(500).json({ error: "Chyba servera počas prihlasovania." });
  }
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select('-password'); // Vynechanie hesla
      if (!user) return res.status(404).json({ error: 'Používateľ nenájdený.' });
      res.json({ user });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  

export default router;
