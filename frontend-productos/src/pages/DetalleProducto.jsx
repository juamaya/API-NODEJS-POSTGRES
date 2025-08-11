import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  PencilIcon,
  TrashIcon,
  TagIcon,
  CubeIcon,
  CurrencyEuroIcon,
  CalendarIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import { useProductos } from '../context/ProductosContext';
import Loading from '../components/Loading';

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { producto, cargando, obtenerProducto, eliminarProducto } = useProductos();

  useEffect(() => {
    if (id) {
      obtenerProducto(id);
    }
  }, [obtenerProducto, id]);

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await eliminarProducto(id);
        navigate('/productos');
      } catch (error) {
        console.error('Error al eliminar producto:', error);
      }
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (cargando) {
    return <Loading size="lg" text="Cargando producto..." />;
  }

  if (!producto) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Producto no encontrado
            </h2>
            <p className="text-gray-600 mb-8">
              El producto que buscas no existe o ha sido eliminado.
            </p>
            <Link to="/productos" className="btn-primary">
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Volver a productos
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/productos')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Volver a productos
          </button>
        </motion.div>

        {/* Contenido principal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Imagen del producto */}
            <div className="relative bg-gray-100 lg:aspect-square aspect-video">
              {producto.imagen_url ? (
                <img
                  src={producto.imagen_url}
                  alt={producto.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://via.placeholder.com/600x400/f3f4f6/6b7280?text=${encodeURIComponent(producto.nombre)}`;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <PhotoIcon className="w-20 h-20 mx-auto text-gray-400 mb-4" />
                    <span className="text-gray-500 font-medium">Sin imagen</span>
                  </div>
                </div>
              )}
              
              {/* Badge de stock */}
              <div className="absolute top-4 right-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  producto.stock > 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  <CubeIcon className="w-4 h-4 mr-1" />
                  {producto.stock > 0 ? `${producto.stock} disponible${producto.stock !== 1 ? 's' : ''}` : 'Sin stock'}
                </span>
              </div>
            </div>

            {/* Información del producto */}
            <div className="p-8">
              <div className="mb-6">
                {/* Categoría */}
                {producto.categoria && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 mb-4">
                    <TagIcon className="w-4 h-4 mr-1" />
                    {producto.categoria}
                  </span>
                )}

                {/* Nombre */}
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {producto.nombre}
                </h1>

                {/* Precio */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-primary-600">
                    {formatPrice(producto.precio)}
                  </span>
                </div>

                {/* Descripción */}
                {producto.descripcion && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Descripción
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {producto.descripcion}
                    </p>
                  </div>
                )}
              </div>

              {/* Información adicional */}
              <div className="border-t border-gray-200 pt-6 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Información adicional
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                        <span className="text-sm font-semibold text-gray-600">ID</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{producto.id}</p>
                      <p className="text-xs text-gray-500">Identificador único</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <CubeIcon className="w-4 h-4 text-blue-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{producto.stock} unidades</p>
                      <p className="text-xs text-gray-500">Disponible en stock</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <CalendarIcon className="w-4 h-4 text-green-600" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDate(producto.fecha_creacion)}
                      </p>
                      <p className="text-xs text-gray-500">Fecha de creación</p>
                    </div>
                  </div>

                  {producto.fecha_actualizacion !== producto.fecha_creacion && (
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <CalendarIcon className="w-4 h-4 text-yellow-600" />
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(producto.fecha_actualizacion)}
                        </p>
                        <p className="text-xs text-gray-500">Última actualización</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="flex space-x-4">
                <Link
                  to={`/productos/${producto.id}/editar`}
                  className="flex-1 btn-primary text-center"
                >
                  <PencilIcon className="w-5 h-5 mr-2" />
                  Editar Producto
                </Link>
                
                <button
                  onClick={handleEliminar}
                  className="btn-danger"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DetalleProducto;
