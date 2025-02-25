import express from 'express';
const router = express.Router();
import Product from '../models/products.mjs';

// Middleware de autenticación admin
const isAdmin = (req, res, next) => {
  // Implementa tu lógica de autenticación aquí
  // Ejemplo básico: verificar header de autenticación
  const authHeader = req.headers.authorization;
  if (authHeader === process.env.ADMIN_PASSWORD) return next();
  res.status(401).json({ error: 'No autorizado' });
};

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// Crear nuevo producto
router.post('/', isAdmin, async (req, res) => {
  try {
    const productData = {
      nombre: req.body.nombre,
      descripcion: req.body.descripcion,
      precio: parseFloat(req.body.precio),
      imagen_url: req.body.imagen_url,
      categoria: req.body.categoria
    };

    // Validación básica
    if (!productData.nombre || !productData.precio) {
      return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }

    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear producto' });
  }
});

// Actualizar producto
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const [updated] = await Product.update(req.body, {
      where: { id: req.params.id }
    });
    
    if (updated) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar producto' });
  }
});

// Eliminar producto
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const deleted = await Product.destroy({
      where: { id: req.params.id }
    });
    
    if (deleted) {
      res.json({ success: true });
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

export default router;