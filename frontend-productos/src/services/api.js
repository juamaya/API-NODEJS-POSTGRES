import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

// Crear instancia de axios con configuración base
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para respuestas de error
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Error en API:', error);
    return Promise.reject(error);
  }
);

export const productosApi = {
  // Obtener todos los productos con filtros opcionales
  obtenerTodos: (filtros = {}) => {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value && value !== '') {
        params.append(key, value);
      }
    });
    return api.get(`/productos?${params.toString()}`);
  },

  // Obtener producto por ID
  obtenerPorId: (id) => {
    return api.get(`/productos/${id}`);
  },

  // Crear nuevo producto
  crear: (producto) => {
    return api.post('/productos', producto);
  },

  // Actualizar producto
  actualizar: (id, producto) => {
    return api.put(`/productos/${id}`, producto);
  },

  // Eliminar producto
  eliminar: (id) => {
    return api.delete(`/productos/${id}`);
  },

  // Obtener categorías disponibles
  obtenerCategorias: () => {
    return api.get('/productos/categorias');
  },

  // Buscar productos
  buscar: (termino) => {
    return api.get(`/productos/buscar/${encodeURIComponent(termino)}`);
  },
};

export default api;
