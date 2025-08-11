const { pool } = require('../config/database');

class Producto {
  constructor(nombre, descripcion, precio, categoria, stock, imagen_url) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria;
    this.stock = stock;
    this.imagen_url = imagen_url;
  }

  // Obtener todos los productos
  static async obtenerTodos(filtros = {}) {
    try {
      let query = `
        SELECT id, nombre, descripcion, precio, categoria, stock, imagen_url, activo, 
               fecha_creacion, fecha_actualizacion 
        FROM productos 
        WHERE activo = true
      `;
      const params = [];
      let paramCount = 0;

      // Filtrar por categoría
      if (filtros.categoria) {
        paramCount++;
        query += ` AND categoria ILIKE $${paramCount}`;
        params.push(`%${filtros.categoria}%`);
      }

      // Filtrar por nombre
      if (filtros.nombre) {
        paramCount++;
        query += ` AND nombre ILIKE $${paramCount}`;
        params.push(`%${filtros.nombre}%`);
      }

      // Filtrar por precio mínimo
      if (filtros.precio_min) {
        paramCount++;
        query += ` AND precio >= $${paramCount}`;
        params.push(filtros.precio_min);
      }

      // Filtrar por precio máximo
      if (filtros.precio_max) {
        paramCount++;
        query += ` AND precio <= $${paramCount}`;
        params.push(filtros.precio_max);
      }

      query += ` ORDER BY fecha_creacion DESC`;

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      throw new Error(`Error al obtener productos: ${error.message}`);
    }
  }

  // Obtener producto por ID
  static async obtenerPorId(id) {
    try {
      const result = await pool.query(
        'SELECT * FROM productos WHERE id = $1 AND activo = true',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al obtener producto: ${error.message}`);
    }
  }

  // Crear nuevo producto
  static async crear(datosProducto) {
    try {
      const { nombre, descripcion, precio, categoria, stock, imagen_url } = datosProducto;
      
      const result = await pool.query(
        `INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen_url) 
         VALUES ($1, $2, $3, $4, $5, $6) 
         RETURNING *`,
        [nombre, descripcion, precio, categoria, stock || 0, imagen_url]
      );
      
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al crear producto: ${error.message}`);
    }
  }

  // Actualizar producto
  static async actualizar(id, datosProducto) {
    try {
      const campos = [];
      const valores = [];
      let contador = 1;

      // Construir la consulta dinámicamente solo con los campos proporcionados
      Object.keys(datosProducto).forEach(key => {
        if (datosProducto[key] !== undefined && datosProducto[key] !== null) {
          campos.push(`${key} = $${contador}`);
          valores.push(datosProducto[key]);
          contador++;
        }
      });

      if (campos.length === 0) {
        throw new Error('No se proporcionaron datos para actualizar');
      }

      valores.push(id);
      const query = `
        UPDATE productos 
        SET ${campos.join(', ')} 
        WHERE id = $${contador} AND activo = true 
        RETURNING *
      `;

      const result = await pool.query(query, valores);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al actualizar producto: ${error.message}`);
    }
  }

  // Eliminar producto (soft delete)
  static async eliminar(id) {
    try {
      const result = await pool.query(
        'UPDATE productos SET activo = false WHERE id = $1 AND activo = true RETURNING *',
        [id]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error al eliminar producto: ${error.message}`);
    }
  }

  // Obtener categorías disponibles
  static async obtenerCategorias() {
    try {
      const result = await pool.query(
        'SELECT DISTINCT categoria FROM productos WHERE activo = true AND categoria IS NOT NULL ORDER BY categoria'
      );
      return result.rows.map(row => row.categoria);
    } catch (error) {
      throw new Error(`Error al obtener categorías: ${error.message}`);
    }
  }

  // Buscar productos
  static async buscar(termino) {
    try {
      const result = await pool.query(
        `SELECT * FROM productos 
         WHERE activo = true AND (
           nombre ILIKE $1 OR 
           descripcion ILIKE $1 OR 
           categoria ILIKE $1
         ) 
         ORDER BY fecha_creacion DESC`,
        [`%${termino}%`]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error al buscar productos: ${error.message}`);
    }
  }
}

module.exports = Producto;
