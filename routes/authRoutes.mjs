import express from 'express';
import jwt from 'jsonwebtoken';
const router = express.Router();

// Generar token JWT
const generateToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET, {
    expiresIn: '1h' // El token expira en 1 hora
  });
};

router.post('/login', (req, res) => {
  const { password } = req.body;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    const token = generateToken({ role: 'admin' });
    res.json({ success: true, token });
  } else {
    res.status(401).json({ success: false, error: "Contraseña incorrecta" });
  }
});


// Middleware de verificación de token
export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) return res.status(401).json({ error: 'Acceso no autorizado' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = decoded.user;
    next();
  });
};


// En authRoutes.mjs
router.get('/verify', verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});

export default router;



