import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlusIcon,
  FunnelIcon,
  XMarkIcon,
  ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { useProductos } from '../context/ProductosContext';
import ProductoCard from '../components/ProductoCard';
import Loading from '../components/Loading';

const Productos = () => {
  const {
    productos,
    categorias,
    filtros,
    cargando,
    obtenerProductos,
    obtenerCategorias,
    actualizarFiltros,
  } = useProductos();

  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [filtrosLocales, setFiltrosLocales] = useState(filtros);

  useEffect(() => {
    obtenerProductos(filtros);
    obtenerCategorias();
  }, [obtenerProductos, obtenerCategorias, filtros]);

  const handleFiltroChange = (campo, valor) => {
    setFiltrosLocales(prev => ({ ...prev, [campo]: valor }));
  };

  const aplicarFiltros = () => {
    actualizarFiltros(filtrosLocales);
    setMostrarFiltros(false);
  };

  const limpiarFiltros = () => {
    const filtrosVacios = {
      categoria: '',
      nombre: '',
      precio_min: '',
      precio_max: '',
    };
    setFiltrosLocales(filtrosVacios);
    actualizarFiltros(filtrosVacios);
  };

  const filtrosActivos = Object.values(filtros).some(valor => valor !== '');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-blue-200 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Productos</h1>
            <p className="text-gray-600">
              Gestiona y organiza tu inventario de productos
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <button
              onClick={() => setMostrarFiltros(!mostrarFiltros)}
              className={`btn-secondary relative ${filtrosActivos ? 'ring-2 ring-primary-500' : ''}`}
            >
              <FunnelIcon className="w-5 h-5 mr-2" />
              Filtros
              {filtrosActivos && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-600 rounded-full"></span>
              )}
            </button>
            
            <Link to="/productos/nuevo" className="btn-primary">
              <PlusIcon className="w-5 h-5 mr-2" />
              Nuevo Producto
            </Link>
          </div>
        </motion.div>

        {/* Panel de Filtros */}
        <AnimatePresence>
          {mostrarFiltros && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-slate-200 rounded-xl shadow-sm border border-gray-200 mb-8 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Filtros</h3>
                  <button
                    onClick={() => setMostrarFiltros(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-">
                  {/* Filtro por nombre */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre del producto
                    </label>
                    <input
                      type="text"
                      placeholder="Buscar por nombre..."
                      value={filtrosLocales.nombre}
                      onChange={(e) => handleFiltroChange('nombre', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  {/* Filtro por categoría */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Categoría
                    </label>
                    <select
                      value={filtrosLocales.categoria}
                      onChange={(e) => handleFiltroChange('categoria', e.target.value)}
                      className="input-field"
                    >
                      <option value="">Todas las categorías</option>
                      {categorias.map(categoria => (
                        <option key={categoria} value={categoria}>
                          {categoria}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Filtro precio mínimo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio mínimo
                    </label>
                    <input
                      type="number"
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                      value={filtrosLocales.precio_min}
                      onChange={(e) => handleFiltroChange('precio_min', e.target.value)}
                      className="input-field"
                    />
                  </div>

                  {/* Filtro precio máximo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio máximo
                    </label>
                    <input
                      type="number"
                      placeholder="999.99"
                      min="0"
                      step="0.01"
                      value={filtrosLocales.precio_max}
                      onChange={(e) => handleFiltroChange('precio_max', e.target.value)}
                      className="input-field"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    onClick={limpiarFiltros}
                    className="btn-secondary"
                  >
                    Limpiar
                  </button>
                  <button
                    onClick={aplicarFiltros}
                    className="btn-primary"
                  >
                    Aplicar Filtros
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Información de resultados */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="text-sm text-gray-600">
            {productos.length > 0 ? (
              <>
                Mostrando <span className="font-semibold text-gray-900">{productos.length}</span> producto{productos.length !== 1 ? 's' : ''}
                {filtrosActivos && (
                  <span className="ml-2 px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                    Filtrados
                  </span>
                )}
              </>
            ) : (
              'No se encontraron productos'
            )}
          </div>
        </motion.div>

        {/* Lista de productos */}
        {cargando ? (
          <Loading size="lg" text="Cargando productos..." />
        ) : productos.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {productos.map((producto) => (
              <motion.div key={producto.id} variants={itemVariants}>
                <ProductoCard producto={producto} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <ShoppingBagIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {filtrosActivos ? 'No se encontraron productos' : 'No hay productos'}
            </h3>
            <p className="text-gray-600 mb-8">
              {filtrosActivos 
                ? 'Intenta ajustar los filtros para ver más resultados' 
                : 'Comienza creando tu primer producto'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {filtrosActivos && (
                <button
                  onClick={limpiarFiltros}
                  className="btn-secondary"
                >
                  Limpiar Filtros
                </button>
              )}
              <Link to="/productos/nuevo" className="btn-primary">
                <PlusIcon className="w-5 h-5 mr-2" />
                Crear Producto
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Productos;
