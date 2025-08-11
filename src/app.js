const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Importar rutas y middleware
const productosRoutes = require('./routes/productos');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware
app.use(cors()); // Habilitar CORS
app.use(express.json({ limit: '10mb' })); // Parser de JSON con límite de tamaño
app.use(express.urlencoded({ extended: true })); // Parser de URL encoded

// Middleware para logging de requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Ruta de salud (health check)
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'API de Productos funcionando correctamente',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Ruta principal
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Bienvenido a la API de Productos',
    version: '1.0.0',
    endpoints: {
      'GET /api/productos': 'Obtener todos los productos',
      'GET /api/productos/:id': 'Obtener producto por ID',
      'POST /api/productos': 'Crear nuevo producto',
      'PUT /api/productos/:id': 'Actualizar producto',
      'DELETE /api/productos/:id': 'Eliminar producto',
      'GET /api/productos/categorias': 'Obtener categorías',
      'GET /api/productos/buscar/:termino': 'Buscar productos'
    }
  });
});

// Rutas de la API
app.use('/api/productos', productosRoutes);

// Middleware para rutas no encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada',
    data: null
  });
});

// Middleware de manejo de errores (debe ir al final)
app.use(errorHandler);

module.exports = app;
