import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useProductos } from '../context/ProductosContext';
import ProductoCard from '../components/ProductoCard';
import Loading from '../components/Loading';

const Buscar = () => {
  const { productos, cargando, buscarProductos } = useProductos();
  const [termino, setTermino] = useState('');
  const [terminoBuscado, setTerminoBuscado] = useState('');
  const [hasBuscado, setHasBuscado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (termino.trim().length < 2) return;
    
    setTerminoBuscado(termino);
    setHasBuscado(true);
    await buscarProductos(termino.trim());
  };

  const limpiarBusqueda = () => {
    setTermino('');
    setTerminoBuscado('');
    setHasBuscado(false);
  };

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
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Buscar Productos
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Encuentra productos específicos buscando por nombre, descripción o categoría
          </p>
        </motion.div>

        {/* Formulario de búsqueda */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <form onSubmit={handleSubmit} className="relative ">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
                className="block w-full pl-10 pr-12 py-4 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                placeholder="Buscar productos..."
                minLength={2}
              />
              <AnimatePresence>
                {termino && (
                  <motion.button
                    type="button"
                    onClick={limpiarBusqueda}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <XMarkIcon className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            
            <motion.button
              type="submit"
              disabled={termino.trim().length < 2 || cargando}
              className="w-full mt-4 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              whileTap={{ scale: 0.98 }}
            >
              {cargando ? (
                <div className="flex items-center justify-center">
                  <motion.div
                    className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Buscando...
                </div>
              ) : (
                <>
                  <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                  Buscar Productos
                </>
              )}
            </motion.button>
          </form>

          {termino.trim().length > 0 && termino.trim().length < 2 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-500 mt-2 text-center"
            >
              Ingresa al menos 2 caracteres para buscar
            </motion.p>
          )}
        </motion.div>

        {/* Resultados de búsqueda */}
        <AnimatePresence mode="wait">
          {hasBuscado && (
            <motion.div
              key="search-results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Información de resultados */}
              <div className="mb-8">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-slate-300 rounded-lg border border-gray-200 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Resultados para "{terminoBuscado}"
                      </h3>
                      <p className="text-sm text-gray-600">
                        {productos.length === 0 
                          ? 'No se encontraron productos'
                          : `${productos.length} producto${productos.length !== 1 ? 's' : ''} encontrado${productos.length !== 1 ? 's' : ''}`
                        }
                      </p>
                    </div>
                    <button
                      onClick={limpiarBusqueda}
                      className="btn-secondary text-sm"
                    >
                      <XMarkIcon className="w-4 h-4 mr-1" />
                      Limpiar
                    </button>
                  </div>
                </motion.div>
              </div>

              {/* Lista de productos */}
              {cargando ? (
                <Loading size="lg" text="Buscando productos..." />
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
                  <MagnifyingGlassIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No se encontraron productos
                  </h3>
                  <p className="text-gray-600 mb-6">
                    No hay productos que coincidan con "{terminoBuscado}"
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={limpiarBusqueda}
                      className="btn-secondary"
                    >
                      Limpiar búsqueda
                    </button>
                    <button
                      onClick={() => {
                        const nuevoTermino = terminoBuscado.split(' ')[0];
                        if (nuevoTermino !== terminoBuscado) {
                          setTermino(nuevoTermino);
                          setTerminoBuscado(nuevoTermino);
                          buscarProductos(nuevoTermino);
                        }
                      }}
                      className="btn-primary"
                    >
                      Buscar término más general
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Sugerencias cuando no se ha buscado */}
        {!hasBuscado && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-slate-200 rounded-xl border border-gray-200 p-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Consejos para buscar
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    🔍 Términos de búsqueda
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Usa palabras clave específicas</li>
                    <li>• Busca por nombre del producto</li>
                    <li>• Prueba con categorías</li>
                    <li>• Incluye características importantes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    💡 Ejemplos
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• "laptop gaming"</li>
                    <li>• "mouse inalámbrico"</li>
                    <li>• "auriculares"</li>
                    <li>• "electrónicos"</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Buscar;
