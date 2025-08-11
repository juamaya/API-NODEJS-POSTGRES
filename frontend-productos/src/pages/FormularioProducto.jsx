import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  PhotoIcon,
  CurrencyEuroIcon,
  TagIcon,
  CubeIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';
import { useProductos } from '../context/ProductosContext';
import Loading from '../components/Loading';

const FormularioProducto = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const esEdicion = Boolean(id);

  const {
    producto,
    categorias,
    cargando,
    obtenerProducto,
    obtenerCategorias,
    crearProducto,
    actualizarProducto,
  } = useProductos();

  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    stock: '',
    imagen_url: '',
  });

  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    obtenerCategorias();
    if (esEdicion && id) {
      obtenerProducto(id);
    }
  }, [obtenerCategorias, obtenerProducto, esEdicion, id]);

  useEffect(() => {
    if (esEdicion && producto) {
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        categoria: producto.categoria || '',
        stock: producto.stock || '',
        imagen_url: producto.imagen_url || '',
      });
    }
  }, [producto, esEdicion]);

  const validarCampo = (campo, valor) => {
    const nuevosErrores = { ...errores };

    switch (campo) {
      case 'nombre':
        if (!valor.trim()) {
          nuevosErrores.nombre = 'El nombre es obligatorio';
        } else if (valor.length < 2) {
          nuevosErrores.nombre = 'El nombre debe tener al menos 2 caracteres';
        } else {
          delete nuevosErrores.nombre;
        }
        break;

      case 'precio':
        if (!valor) {
          nuevosErrores.precio = 'El precio es obligatorio';
        } else if (isNaN(valor) || parseFloat(valor) <= 0) {
          nuevosErrores.precio = 'El precio debe ser un número positivo';
        } else {
          delete nuevosErrores.precio;
        }
        break;

      case 'stock':
        if (valor !== '' && (isNaN(valor) || parseInt(valor) < 0)) {
          nuevosErrores.stock = 'El stock debe ser un número positivo o cero';
        } else {
          delete nuevosErrores.stock;
        }
        break;

      case 'imagen_url':
        if (valor && !isValidUrl(valor)) {
          nuevosErrores.imagen_url = 'La URL de la imagen no es válida';
        } else {
          delete nuevosErrores.imagen_url;
        }
        break;

      default:
        break;
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleInputChange = (campo, valor) => {
    setFormData(prev => ({ ...prev, [campo]: valor }));
    validarCampo(campo, valor);
  };

  const validarFormulario = () => {
    const camposObligatorios = ['nombre', 'precio'];
    let esValido = true;
    const nuevosErrores = {};

    camposObligatorios.forEach(campo => {
      if (!formData[campo] || !formData[campo].toString().trim()) {
        nuevosErrores[campo] = `${campo === 'nombre' ? 'El nombre' : 'El precio'} es obligatorio`;
        esValido = false;
      }
    });

    // Validar precio
    if (formData.precio && (isNaN(formData.precio) || parseFloat(formData.precio) <= 0)) {
      nuevosErrores.precio = 'El precio debe ser un número positivo';
      esValido = false;
    }

    // Validar stock
    if (formData.stock !== '' && (isNaN(formData.stock) || parseInt(formData.stock) < 0)) {
      nuevosErrores.stock = 'El stock debe ser un número positivo o cero';
      esValido = false;
    }

    // Validar URL de imagen
    if (formData.imagen_url && !isValidUrl(formData.imagen_url)) {
      nuevosErrores.imagen_url = 'La URL de la imagen no es válida';
      esValido = false;
    }

    setErrores(nuevosErrores);
    return esValido;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validarFormulario()) {
      return;
    }

    setEnviando(true);

    try {
      const datosProducto = {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: formData.stock ? parseInt(formData.stock) : 0,
      };

      if (esEdicion) {
        await actualizarProducto(id, datosProducto);
      } else {
        await crearProducto(datosProducto);
      }

      navigate('/productos');
    } catch (error) {
      console.error('Error al guardar producto:', error);
    } finally {
      setEnviando(false);
    }
  };

  if (cargando && esEdicion) {
    return <Loading size="lg" text="Cargando producto..." />;
  }

  return (
    <div className="min-h-screen bg-blue-200 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
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
          
          <h1 className="text-3xl font-bold text-gray-900">
            {esEdicion ? 'Editar Producto' : 'Nuevo Producto'}
          </h1>
          <p className="text-gray-600 mt-2">
            {esEdicion 
              ? 'Modifica la información del producto' 
              : 'Completa la información para crear un nuevo producto'
            }
          </p>
        </motion.div>

        {/* Formulario */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200"
        >
          <form onSubmit={handleSubmit} className="p-6 space-y-6 bg-slate-200">
            {/* Nombre del producto */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <TagIcon className="w-4 h-4 mr-2" />
                Nombre del producto *
              </label>
              <input
                type="text"
                value={formData.nombre}
                onChange={(e) => handleInputChange('nombre', e.target.value)}
                className={`input-field ${errores.nombre ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="Ingresa el nombre del producto"
                required
              />
              {errores.nombre && (
                <p className="mt-1 text-sm text-red-600">{errores.nombre}</p>
              )}
            </div>

            {/* Descripción */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <DocumentTextIcon className="w-4 h-4 mr-2" />
                Descripción
              </label>
              <textarea
                value={formData.descripcion}
                onChange={(e) => handleInputChange('descripcion', e.target.value)}
                rows="4"
                className="input-field resize-none"
                placeholder="Describe las características del producto (opcional)"
              />
            </div>

            {/* Precio y Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Precio */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <CurrencyEuroIcon className="w-4 h-4 mr-2" />
                  Precio *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.precio}
                  onChange={(e) => handleInputChange('precio', e.target.value)}
                  className={`input-field ${errores.precio ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="0.00"
                  required
                />
                {errores.precio && (
                  <p className="mt-1 text-sm text-red-600">{errores.precio}</p>
                )}
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                  <CubeIcon className="w-4 h-4 mr-2" />
                  Stock
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.stock}
                  onChange={(e) => handleInputChange('stock', e.target.value)}
                  className={`input-field ${errores.stock ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="0"
                />
                {errores.stock && (
                  <p className="mt-1 text-sm text-red-600">{errores.stock}</p>
                )}
              </div>
            </div>

            {/* Categoría */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <TagIcon className="w-4 h-4 mr-2" />
                Categoría
              </label>
              <select
                value={formData.categoria}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
                className="input-field"
              >
                <option value="">Selecciona una categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-xs text-gray-500">
                Si no encuentras la categoría apropiada, puedes escribir una nueva en lugar de seleccionar
              </p>
              <input
                type="text"
                value={formData.categoria}
                onChange={(e) => handleInputChange('categoria', e.target.value)}
                className="input-field mt-2"
                placeholder="O escribe una nueva categoría"
              />
            </div>

            {/* URL de imagen */}
            <div>
              <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <PhotoIcon className="w-4 h-4 mr-2" />
                URL de la imagen
              </label>
              <input
                type="url"
                value={formData.imagen_url}
                onChange={(e) => handleInputChange('imagen_url', e.target.value)}
                className={`input-field ${errores.imagen_url ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {errores.imagen_url && (
                <p className="mt-1 text-sm text-red-600">{errores.imagen_url}</p>
              )}
              {formData.imagen_url && !errores.imagen_url && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
                  <img
                    src={formData.imagen_url}
                    alt="Vista previa"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-4 space-y-4 sm:space-y-0 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/productos')}
                className="btn-secondary w-full sm:w-auto"
                disabled={enviando}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-primary w-full sm:w-auto"
                disabled={enviando}
              >
                {enviando ? (
                  <div className="flex items-center justify-center">
                    <motion.div
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    {esEdicion ? 'Actualizando...' : 'Creando...'}
                  </div>
                ) : (
                  esEdicion ? 'Actualizar Producto' : 'Crear Producto'
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default FormularioProducto;
