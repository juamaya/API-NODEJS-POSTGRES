// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de base de datos de PostgreSQL
  if (err.code) {
    switch (err.code) {
      case '23505': // Violación de restricción única
        return res.status(400).json({
          success: false,
          message: 'Ya existe un registro con estos datos',
          data: null
        });
      case '23503': // Violación de clave foránea
        return res.status(400).json({
          success: false,
          message: 'Referencia inválida en la base de datos',
          data: null
        });
      case '23514': // Violación de restricción check
        return res.status(400).json({
          success: false,
          message: 'Los datos no cumplen con las restricciones',
          data: null
        });
      default:
        return res.status(500).json({
          success: false,
          message: 'Error en la base de datos',
          data: null
        });
    }
  }

  // Error de validación de JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      message: 'JSON inválido en el cuerpo de la petición',
      data: null
    });
  }

  // Error por defecto
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
    data: null
  });
};

module.exports = errorHandler;
