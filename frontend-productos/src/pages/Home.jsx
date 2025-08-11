import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
  ChartBarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useProductos } from '../context/ProductosContext';
import ProductoCard from '../components/ProductoCard';

const Home = () => {
  const { productos, obtenerProductos, cargando } = useProductos();

  useEffect(() => {
    obtenerProductos();
  }, [obtenerProductos]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const estadisticas = [
    {
      nombre: 'Total Productos',
      valor: productos.length,
      icon: ShoppingBagIcon,
      color: 'from-blue-500 to-blue-600',
    },
    {
      nombre: 'En Stock',
      valor: productos.filter(p => p.stock > 0).length,
      icon: ChartBarIcon,
      color: 'from-green-500 to-green-600',
    },
    {
      nombre: 'Categorías',
      valor: new Set(productos.map(p => p.categoria)).size,
      icon: SparklesIcon,
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="min-h-screen bg-blue-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Gestiona tus
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                Productos
              </span>
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Una plataforma moderna y elegante para administrar tu inventario de productos.
              Crea, edita, busca y organiza todo desde un solo lugar.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link
                to="/productos/nuevo"
                className="inline-flex items-center px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Crear Producto
              </Link>
              <Link
                to="/productos"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-700 transition-all duration-200"
              >
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                Ver Productos
              </Link>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-96 h-96 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2">
          <div className="w-96 h-96 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 "
          >
            {estadisticas.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.nombre}
                  variants={itemVariants}
                  className="relative overflow-hidden bg-white rounded-2xl shadow-sm border border-gray-200 p-8 group hover:shadow-lg transition-all duration-300"
                >
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${stat.color} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>
                  <div className="relative">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {stat.valor}
                    </h3>
                    <p className="text-gray-600 font-medium">{stat.nombre}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Productos Recientes */}
      <section className="py-16 bg-blue-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Productos Recientes
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Echa un vistazo a los productos agregados recientemente
            </p>
          </motion.div>

          {cargando ? (
            <div className="flex justify-center py-12">
              <motion.div
                className="w-12 h-12 border-4 border-gray-200 border-t-primary-600 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : productos.length > 0 ? (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {productos.slice(0, 6).map((producto) => (
                <ProductoCard key={producto.id} producto={producto} />
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
                No hay productos
              </h3>
              <p className="text-gray-600 mb-8">
                Comienza creando tu primer producto
              </p>
              <Link
                to="/productos/nuevo"
                className="btn-primary inline-flex items-center"
              >
                <PlusIcon className="w-5 h-5 mr-2" />
                Crear Producto
              </Link>
            </motion.div>
          )}

          {productos.length > 6 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link
                to="/productos"
                className="btn-secondary inline-flex items-center"
              >
                Ver Todos los Productos
                <ChartBarIcon className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Listo para empezar?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Explora todas las funcionalidades disponibles para gestionar tus productos
              de manera eficiente y profesional.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/productos"
                className="btn-primary inline-flex items-center"
              >
                <ShoppingBagIcon className="w-5 h-5 mr-2" />
                Explorar Productos
              </Link>
              <Link
                to="/buscar"
                className="btn-secondary inline-flex items-center"
              >
                <MagnifyingGlassIcon className="w-5 h-5 mr-2" />
                Buscar Productos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
