import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PencilIcon,
  TrashIcon,
  EyeIcon,
  TagIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { useProductos } from '../context/ProductosContext';

const ProductoCard = ({ producto }) => {
  const { eliminarProducto } = useProductos();

  const handleEliminar = async () => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      try {
        await eliminarProducto(producto.id);
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -8, scale: 1.02 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      className="bg-slate-300 rounded-xl shadow-sm border border-gray-200 overflow-hidden group transition-all duration-300"
    >
      {/* Imagen del producto */}
      <div className="relative aspect-w-16 aspect-h-9 bg-gray-100">
        {producto.imagen_url ? (
          <img
            src={producto.imagen_url}
            alt={producto.nombre}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://via.placeholder.com/400x200/f3f4f6/6b7280?text=${encodeURIComponent(producto.nombre)}`;
            }}
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <CubeIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
              <span className="text-sm text-gray-500 font-medium">Sin imagen</span>
            </div>
          </div>
        )}
        
        {/* Badge de categoría */}
        {producto.categoria && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
              <TagIcon className="w-3 h-3 mr-1" />
              {producto.categoria}
            </span>
          </div>
        )}

        {/* Badge de stock */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            producto.stock > 0 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            Stock: {producto.stock}
          </span>
        </div>
      </div>

      {/* Contenido de la card */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {producto.nombre}
          </h3>
          {producto.descripcion && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {producto.descripcion}
            </p>
          )}
        </div>

        {/* Precio */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-primary-600">
            {formatPrice(producto.precio)}
          </span>
        </div>

        {/* Información adicional */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span>ID: {producto.id}</span>
          <span>
            {new Date(producto.fecha_creacion).toLocaleDateString('es-ES')}
          </span>
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-2">
          <Link
            to={`/productos/${producto.id}`}
            className="flex-1 btn-secondary text-center text-sm py-2 flex items-center justify-center space-x-1"
          >
            <EyeIcon className="w-4 h-4" />
            <span>Ver</span>
          </Link>
          
          <Link
            to={`/productos/${producto.id}/editar`}
            className="flex-1 btn-primary text-center text-sm py-2 flex items-center justify-center space-x-1"
          >
            <PencilIcon className="w-4 h-4" />
            <span>Editar</span>
          </Link>
          
          <button
            onClick={handleEliminar}
            className="btn-danger text-sm py-2 px-3 flex items-center justify-center"
          >
            <TrashIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductoCard;
