import express from 'express';
const router = express.Router();
import multer from 'multer';

const upload = multer({ dest: "uploads/" });

router.post('/', upload.single("imagen"), (req, res) => {
  res.json({ 
    url: `/uploads/${req.file.filename}`,
    message: "Implementa la subida real de archivos"
  });
});

export default router;