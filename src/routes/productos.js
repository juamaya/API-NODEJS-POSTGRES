const express = require('express');
const ProductoController = require('../controllers/productoController');

const router = express.Router();

// Rutas para productos

// GET /api/productos/categorias - Debe ir antes que /:id
router.get('/categorias', ProductoController.obtenerCategorias);

// GET /api/productos/buscar/:termino - Debe ir antes que /:id
router.get('/buscar/:termino', ProductoController.buscar);

// GET /api/productos - Obtener todos los productos (con filtros opcionales)
router.get('/', ProductoController.obtenerTodos);

// GET /api/productos/:id - Obtener producto por ID
router.get('/:id', ProductoController.obtenerPorId);

// POST /api/productos - Crear nuevo producto
router.post('/', ProductoController.crear);

// PUT /api/productos/:id - Actualizar producto
router.put('/:id', ProductoController.actualizar);

// DELETE /api/productos/:id - Eliminar producto (soft delete)
router.delete('/:id', ProductoController.eliminar);

module.exports = router;
