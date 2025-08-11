const app = require('./app');
const { testConnection } = require('./config/database');

const PORT = process.env.PORT || 3000;

// Función para inicializar el servidor
const startServer = async () => {
  try {
    // Probar la conexión a la base de datos
    await testConnection();
    
    // Iniciar el servidor
    app.listen(PORT, () => {
      console.log(`🚀 Servidor iniciado en el puerto ${PORT}`);
      console.log(`🌐 API disponible en: http://localhost:${PORT}`);
      console.log(`📚 Documentación en: http://localhost:${PORT}/`);
      console.log(`❤️  Health check en: http://localhost:${PORT}/health`);
      console.log('');
      console.log('Endpoints disponibles:');
      console.log(`  GET    http://localhost:${PORT}/api/productos`);
      console.log(`  GET    http://localhost:${PORT}/api/productos/:id`);
      console.log(`  POST   http://localhost:${PORT}/api/productos`);
      console.log(`  PUT    http://localhost:${PORT}/api/productos/:id`);
      console.log(`  DELETE http://localhost:${PORT}/api/productos/:id`);
      console.log(`  GET    http://localhost:${PORT}/api/productos/categorias`);
      console.log(`  GET    http://localhost:${PORT}/api/productos/buscar/:termino`);
    });
  } catch (error) {
    console.error('❌ Error al iniciar el servidor:', error.message);
    process.exit(1);
  }
};

// Manejo de errores no capturados
process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

// Manejo de señales para cerrar el servidor gracefully
process.on('SIGTERM', () => {
  console.log('🔄 SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('🔄 SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

// Iniciar el servidor
startServer();
