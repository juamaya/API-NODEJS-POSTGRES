import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { productosApi } from '../services/api';
import toast from 'react-hot-toast';

// Estado inicial
const estadoInicial = {
  productos: [],
  categorias: [],
  producto: null,
  cargando: false,
  error: null,
  filtros: {
    categoria: '',
    nombre: '',
    precio_min: '',
    precio_max: '',
  },
};

// Tipos de acciones
const TIPOS = {
  SET_CARGANDO: 'SET_CARGANDO',
  SET_PRODUCTOS: 'SET_PRODUCTOS',
  SET_CATEGORIAS: 'SET_CATEGORIAS',
  SET_PRODUCTO: 'SET_PRODUCTO',
  SET_ERROR: 'SET_ERROR',
  SET_FILTROS: 'SET_FILTROS',
  AGREGAR_PRODUCTO: 'AGREGAR_PRODUCTO',
  ACTUALIZAR_PRODUCTO: 'ACTUALIZAR_PRODUCTO',
  ELIMINAR_PRODUCTO: 'ELIMINAR_PRODUCTO',
  LIMPIAR_ERROR: 'LIMPIAR_ERROR',
};

// Reducer
const productosReducer = (estado, accion) => {
  switch (accion.type) {
    case TIPOS.SET_CARGANDO:
      return { ...estado, cargando: accion.payload };
    
    case TIPOS.SET_PRODUCTOS:
      return { ...estado, productos: accion.payload, cargando: false, error: null };
    
    case TIPOS.SET_CATEGORIAS:
      return { ...estado, categorias: accion.payload };
    
    case TIPOS.SET_PRODUCTO:
      return { ...estado, producto: accion.payload, cargando: false, error: null };
    
    case TIPOS.SET_ERROR:
      return { ...estado, error: accion.payload, cargando: false };
    
    case TIPOS.SET_FILTROS:
      return { ...estado, filtros: { ...estado.filtros, ...accion.payload } };
    
    case TIPOS.AGREGAR_PRODUCTO:
      return { ...estado, productos: [accion.payload, ...estado.productos] };
    
    case TIPOS.ACTUALIZAR_PRODUCTO:
      return {
        ...estado,
        productos: estado.productos.map(p => 
          p.id === accion.payload.id ? accion.payload : p
        ),
        producto: accion.payload,
      };
    
    case TIPOS.ELIMINAR_PRODUCTO:
      return {
        ...estado,
        productos: estado.productos.filter(p => p.id !== accion.payload),
      };
    
    case TIPOS.LIMPIAR_ERROR:
      return { ...estado, error: null };
    
    default:
      return estado;
  }
};

// Crear contexto
const ProductosContext = createContext();

// Hook personalizado para usar el contexto
export const useProductos = () => {
  const context = useContext(ProductosContext);
  if (!context) {
    throw new Error('useProductos debe usarse dentro de ProductosProvider');
  }
  return context;
};

// Provider del contexto
export const ProductosProvider = ({ children }) => {
  const [estado, dispatch] = useReducer(productosReducer, estadoInicial);

  // Función para manejar errores
  const manejarError = useCallback((error) => {
    const mensaje = error?.response?.data?.message || error?.message || 'Ha ocurrido un error';
    dispatch({ type: TIPOS.SET_ERROR, payload: mensaje });
    toast.error(mensaje);
  }, []);

  // Obtener todos los productos
  const obtenerProductos = useCallback(async (filtros = {}) => {
    try {
      dispatch({ type: TIPOS.SET_CARGANDO, payload: true });
      const response = await productosApi.obtenerTodos(filtros);
      dispatch({ type: TIPOS.SET_PRODUCTOS, payload: response.data.data });
    } catch (error) {
      manejarError(error);
    }
  }, [manejarError]);

  // Obtener producto por ID
  const obtenerProducto = useCallback(async (id) => {
    try {
      dispatch({ type: TIPOS.SET_CARGANDO, payload: true });
      const response = await productosApi.obtenerPorId(id);
      dispatch({ type: TIPOS.SET_PRODUCTO, payload: response.data.data });
    } catch (error) {
      manejarError(error);
    }
  }, [manejarError]);

  // Crear producto
  const crearProducto = useCallback(async (productoData) => {
    try {
      dispatch({ type: TIPOS.SET_CARGANDO, payload: true });
      const response = await productosApi.crear(productoData);
      dispatch({ type: TIPOS.AGREGAR_PRODUCTO, payload: response.data.data });
      toast.success('Producto creado exitosamente');
      return response.data.data;
    } catch (error) {
      manejarError(error);
      throw error;
    }
  }, [manejarError]);

  // Actualizar producto
  const actualizarProducto = useCallback(async (id, productoData) => {
    try {
      dispatch({ type: TIPOS.SET_CARGANDO, payload: true });
      const response = await productosApi.actualizar(id, productoData);
      dispatch({ type: TIPOS.ACTUALIZAR_PRODUCTO, payload: response.data.data });
      toast.success('Producto actualizado exitosamente');
      return response.data.data;
    } catch (error) {
      manejarError(error);
      throw error;
    }
  }, [manejarError]);

  // Eliminar producto
  const eliminarProducto = useCallback(async (id) => {
    try {
      await productosApi.eliminar(id);
      dispatch({ type: TIPOS.ELIMINAR_PRODUCTO, payload: id });
      toast.success('Producto eliminado exitosamente');
    } catch (error) {
      manejarError(error);
      throw error;
    }
  }, [manejarError]);

  // Obtener categorías
  const obtenerCategorias = useCallback(async () => {
    try {
      const response = await productosApi.obtenerCategorias();
      dispatch({ type: TIPOS.SET_CATEGORIAS, payload: response.data.data });
    } catch (error) {
      manejarError(error);
    }
  }, [manejarError]);

  // Buscar productos
  const buscarProductos = useCallback(async (termino) => {
    try {
      dispatch({ type: TIPOS.SET_CARGANDO, payload: true });
      const response = await productosApi.buscar(termino);
      dispatch({ type: TIPOS.SET_PRODUCTOS, payload: response.data.data });
    } catch (error) {
      manejarError(error);
    }
  }, [manejarError]);

  // Actualizar filtros
  const actualizarFiltros = useCallback((nuevosFiltros) => {
    dispatch({ type: TIPOS.SET_FILTROS, payload: nuevosFiltros });
  }, []);

  // Limpiar error
  const limpiarError = useCallback(() => {
    dispatch({ type: TIPOS.LIMPIAR_ERROR });
  }, []);

  // Valor del contexto
  const value = {
    ...estado,
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    eliminarProducto,
    obtenerCategorias,
    buscarProductos,
    actualizarFiltros,
    limpiarError,
  };

  return (
    <ProductosContext.Provider value={value}>
      {children}
    </ProductosContext.Provider>
  );
};
