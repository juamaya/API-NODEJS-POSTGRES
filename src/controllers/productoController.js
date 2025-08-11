const Producto = require('../models/Producto');

class ProductoController {
  // GET /api/productos - Obtener todos los productos
  static async obtenerTodos(req, res) {
    try {
      const filtros = {
        categoria: req.query.categoria,
        nombre: req.query.nombre,
        precio_min: req.query.precio_min,
        precio_max: req.query.precio_max
      };

      const productos = await Producto.obtenerTodos(filtros);
      
      res.json({
        success: true,
        data: productos,
        count: productos.length,
        message: 'Productos obtenidos exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  // GET /api/productos/:id - Obtener producto por ID
  static async obtenerPorId(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido',
          data: null
        });
      }

      const producto = await Producto.obtenerPorId(parseInt(id));
      
      if (!producto) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
          data: null
        });
      }

      res.json({
        success: true,
        data: producto,
        message: 'Producto obtenido exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  // POST /api/productos - Crear nuevo producto
  static async crear(req, res) {
    try {
      const { nombre, descripcion, precio, categoria, stock, imagen_url } = req.body;

      // Validaciones básicas
      if (!nombre || !precio) {
        return res.status(400).json({
          success: false,
          message: 'Nombre y precio son campos obligatorios',
          data: null
        });
      }

      if (precio <= 0) {
        return res.status(400).json({
          success: false,
          message: 'El precio debe ser mayor que 0',
          data: null
        });
      }

      if (stock && stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'El stock no puede ser negativo',
          data: null
        });
      }

      const datosProducto = {
        nombre,
        descripcion,
        precio: parseFloat(precio),
        categoria,
        stock: stock ? parseInt(stock) : 0,
        imagen_url
      };

      const nuevoProducto = await Producto.crear(datosProducto);

      res.status(201).json({
        success: true,
        data: nuevoProducto,
        message: 'Producto creado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  // PUT /api/productos/:id - Actualizar producto
  static async actualizar(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido',
          data: null
        });
      }

      const { nombre, descripcion, precio, categoria, stock, imagen_url } = req.body;

      // Validar que al menos un campo esté presente
      if (!nombre && !descripcion && !precio && !categoria && stock === undefined && !imagen_url) {
        return res.status(400).json({
          success: false,
          message: 'Debe proporcionar al menos un campo para actualizar',
          data: null
        });
      }

      // Validaciones
      if (precio !== undefined && precio <= 0) {
        return res.status(400).json({
          success: false,
          message: 'El precio debe ser mayor que 0',
          data: null
        });
      }

      if (stock !== undefined && stock < 0) {
        return res.status(400).json({
          success: false,
          message: 'El stock no puede ser negativo',
          data: null
        });
      }

      const datosActualizacion = {};
      if (nombre) datosActualizacion.nombre = nombre;
      if (descripcion) datosActualizacion.descripcion = descripcion;
      if (precio !== undefined) datosActualizacion.precio = parseFloat(precio);
      if (categoria) datosActualizacion.categoria = categoria;
      if (stock !== undefined) datosActualizacion.stock = parseInt(stock);
      if (imagen_url) datosActualizacion.imagen_url = imagen_url;

      const productoActualizado = await Producto.actualizar(parseInt(id), datosActualizacion);

      if (!productoActualizado) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
          data: null
        });
      }

      res.json({
        success: true,
        data: productoActualizado,
        message: 'Producto actualizado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  // DELETE /api/productos/:id - Eliminar producto
  static async eliminar(req, res) {
    try {
      const { id } = req.params;
      
      if (!id || isNaN(id)) {
        return res.status(400).json({
          success: false,
          message: 'ID de producto inválido',
          data: null
        });
      }

      const productoEliminado = await Producto.eliminar(parseInt(id));

      if (!productoEliminado) {
        return res.status(404).json({
          success: false,
          message: 'Producto no encontrado',
          data: null
        });
      }

      res.json({
        success: true,
        data: productoEliminado,
        message: 'Producto eliminado exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  // GET /api/productos/categorias - Obtener todas las categorías
  static async obtenerCategorias(req, res) {
    try {
      const categorias = await Producto.obtenerCategorias();
      
      res.json({
        success: true,
        data: categorias,
        count: categorias.length,
        message: 'Categorías obtenidas exitosamente'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }

  // GET /api/productos/buscar/:termino - Buscar productos
  static async buscar(req, res) {
    try {
      const { termino } = req.params;
      
      if (!termino || termino.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: 'El término de búsqueda debe tener al menos 2 caracteres',
          data: null
        });
      }

      const productos = await Producto.buscar(termino.trim());
      
      res.json({
        success: true,
        data: productos,
        count: productos.length,
        message: `Búsqueda completada para: ${termino}`
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
        data: null
      });
    }
  }
}

module.exports = ProductoController;
