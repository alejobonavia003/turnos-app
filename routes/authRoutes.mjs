import express from 'express';
const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (password === correctPassword) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, error: "Contraseña incorrecta" });
  }
});

export default router;