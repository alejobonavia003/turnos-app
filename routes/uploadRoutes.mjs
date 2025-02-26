import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Configurar Cloudinary con tus credenciales
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Usar multer con almacenamiento en memoria
const storage = multer.memoryStorage();
const upload = multer({dest: 'uploads' });

// Endpoint para subir una imagen a Cloudinary
router.post('/', upload.single('image'), async (req, res) => {

  try {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'Mantis-APP'  // Especificamos la carpeta donde se subirá la imagen
      });
      res.status(200).json(result);
  } catch (error) {
    console.error("Error al subir imagen a Cloudinary:", error);
  }
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo' });
  }

});

// Endpoint GET para listar las imágenes subidas a Cloudinary
router.get('/', async (req, res) => {
  try {
    // Realiza una búsqueda de imágenes en el folder 'mi_tienda'
    const result = await cloudinary.search
      .expression('folder:Mantis-APP')
      .sort_by('public_id', 'desc')
      .max_results(100)
      .execute();
    
    // Extrae la información relevante de cada recurso
    const images = result.resources.map(resource => ({
      url: resource.secure_url,
      public_id: resource.public_id
    }));
    
    res.json(images);
  } catch (error) {
    console.error("Error al obtener imágenes de Cloudinary:", error);
    res.status(500).json({ error: 'Error al obtener imágenes' });
  }
});

// Endpoint para eliminar una imagen en Cloudinary usando su public_id
router.delete('/:public_id', async (req, res) => {
  const { public_id } = req.params;
  try {
    const result = await cloudinary.uploader.destroy(public_id);
    res.json({ message: 'Imagen eliminada', result });
  } catch (error) {
    console.error("Error al eliminar imagen en Cloudinary:", error);
    res.status(500).json({ error: 'Error al eliminar la imagen' });
  }
});

export default router;
