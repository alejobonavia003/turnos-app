// routes/blockRoutes.js
import express from 'express';
import  Block  from "../models/Block.mjs"; // Asumiendo que usas index.js para importar modelos
const router = express.Router();
import  sequelize  from '../config/db.mjs';



// GET: Listar todos los bloques
router.get('/', async (req, res) => {
  try {
    const blocks = await Block.findAll({
      order: [['orderIndex', 'ASC']] // Ordenar por la columna real
    });
    res.json(blocks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET: Obtener un bloque por id
router.get('/:id', async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (block) {
      res.json(block);
    } else {
      res.status(404).json({ error: 'Bloque no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST: Crear un nuevo bloque
router.post('/', async (req, res) => {
  const transaction = await sequelize.transaction();
  
  try {
    // Validación básica
    if (!req.body.type) {
      await transaction.rollback();
      return res.status(400).json({ error: "El tipo de bloque es requerido" });
    }

    // Calcular orderIndex
    const page = req.body.page || 'home';
    
    const lastBlock = await Block.findOne({
      where: { page },
      order: [['order_index', 'DESC']],
      transaction
    });

    const newOrderIndex = (lastBlock?.orderIndex || 0) + 1;

    // Crear bloque
    const newBlock = await Block.create({
      type: req.body.type,
      page: page,
      configuration: req.body.configuration || {},
      orderIndex: newOrderIndex
    }, { transaction });

    await transaction.commit();
    
    res.status(201).json(newBlock);
  } catch (error) {
    await transaction.rollback();
    console.error('Error:', error);
    res.status(500).json({
      error: 'Error al crear bloque',
      details: error.errors?.map(e => e.message) || error.message
    });
  }
});

// PUT: Actualizar un bloque existente
router.put('/:id', async (req, res) => {
  //console.log("Datos recibidos en PUT:", req.body); // Para depuración
  try {
    const { type, configuration, orderIndex, page } = req.body;
    const block = await Block.findByPk(req.params.id);
    if (block) {
      await block.update({ type, configuration, orderIndex, page });
      res.json(block);
    } else {
      res.status(404).json({ error: 'Bloque no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// DELETE: Eliminar un bloque
router.delete('/:id', async (req, res) => {
  try {
    const block = await Block.findByPk(req.params.id);
    if (block) {
      await block.destroy();
      res.json({ message: 'Bloque eliminado' });
    } else {
      res.status(404).json({ error: 'Bloque no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
