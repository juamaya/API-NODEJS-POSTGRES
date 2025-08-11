# Frontend Productos - React + Vite + TailwindCSS

Frontend moderno y elegante para la gestión de productos, construido con React, Vite y TailwindCSS.

## 🎨 Características del Frontend

- ✨ **Interfaz moderna** - Diseño limpio y profesional
- 🎭 **Animaciones fluidas** - Transiciones y efectos con Framer Motion
- 📱 **Totalmente responsive** - Optimizado para todos los dispositivos
- 🚀 **Alto rendimiento** - Construido con Vite para desarrollo rápido
- 🎯 **UX intuitiva** - Navegación fácil y experiencia de usuario optimizada
- 🔍 **Búsqueda avanzada** - Filtros y búsqueda en tiempo real
- 📦 **Gestión completa** - CRUD completo de productos
- 🎨 **Tema consistente** - Sistema de colores y tipografías coherente

## 🛠️ Tecnologías

- **React 18** - Biblioteca de interfaz de usuario
- **Vite** - Herramienta de construcción rápida
- **TailwindCSS** - Framework de CSS utilitario
- **Framer Motion** - Librería de animaciones
- **React Router** - Enrutamiento del lado del cliente
- **Axios** - Cliente HTTP para API calls
- **React Hot Toast** - Notificaciones elegantes
- **Heroicons** - Iconos SVG optimizados

## 📋 Prerequisitos

- Node.js (versión 16 o superior)
- npm o yarn
- API Backend ejecutándose en http://localhost:3000

## 🚀 Instalación

1. **Navegar al directorio del frontend**
   ```bash
   cd frontend-productos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:5173
   ```

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo

# Producción  
npm run build        # Construye la aplicación para producción
npm run preview      # Vista previa de la build de producción

# Linting
npm run lint         # Ejecuta ESLint para revisar el código
```

## 🎨 Páginas y Funcionalidades

### 🏠 Página de Inicio
- Hero section atractivo
- Estadísticas del inventario
- Vista previa de productos recientes
- Links de navegación rápida

### 📦 Lista de Productos
- Grid responsive de tarjetas de productos
- Filtros avanzados (categoría, precio, nombre)
- Ordenamiento dinámico
- Paginación y búsqueda

### ➕ Crear/Editar Producto
- Formulario completo con validación
- Vista previa de imagen en tiempo real
- Selección de categorías existentes
- Validación de campos obligatorios

### 🔍 Búsqueda de Productos
- Búsqueda por nombre, descripción o categoría
- Resultados en tiempo real
- Sugerencias de búsqueda
- Filtros aplicables

### 👁️ Detalle de Producto
- Vista completa del producto
- Información detallada
- Acciones de edición y eliminación
- Historial de fechas

## 🎨 Sistema de Diseño

### Colores Principales
- **Primary**: Azul (#3b82f6)
- **Success**: Verde (#10b981)
- **Danger**: Rojo (#ef4444)
- **Warning**: Amarillo (#f59e0b)
- **Gray Scale**: Escala de grises completa

### Componentes Reutilizables
- **Botones**: Primary, Secondary, Danger
- **Cards**: Productos, información
- **Forms**: Inputs, selects, textareas
- **Loading**: Spinners animados
- **Navigation**: Barra de navegación responsive

## 📱 Responsive Design

El frontend está optimizado para:
- 📱 **Móviles** (320px - 768px)
- 📟 **Tablets** (768px - 1024px)  
- 💻 **Desktop** (1024px+)
- 🖥️ **Large Desktop** (1440px+)

## 🔧 Configuración Avanzada

### Proxy de API
El frontend está configurado para hacer proxy de las peticiones API:
```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      changeOrigin: true,
    },
  },
}
```

### Variables de Entorno
Crear archivo `.env` en la raíz del frontend:
```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🎭 Animaciones

Las animaciones están implementadas con Framer Motion:
- Transiciones de página
- Hover effects en cards
- Loading states
- Micro-interacciones

## 📦 Estructura del Proyecto

```
frontend-productos/
├── public/
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── Navigation.jsx
│   │   ├── ProductoCard.jsx
│   │   └── Loading.jsx
│   ├── context/          # Context API
│   │   └── ProductosContext.jsx
│   ├── pages/            # Páginas principales
│   │   ├── Home.jsx
│   │   ├── Productos.jsx
│   │   ├── FormularioProducto.jsx
│   │   ├── DetalleProducto.jsx
│   │   └── Buscar.jsx
│   ├── services/         # Servicios API
│   │   └── api.js
│   ├── App.jsx           # Componente principal
│   ├── main.jsx          # Punto de entrada
│   └── index.css         # Estilos globales
├── tailwind.config.js    # Configuración de Tailwind
├── vite.config.js        # Configuración de Vite
└── package.json
```

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Servir Build Localmente
```bash
npm run preview
```

### Despliegue en Vercel/Netlify
El frontend está optimizado para despliegue en plataformas como Vercel o Netlify. Solo necesitas:

1. Conectar el repositorio
2. Configurar la variable de entorno `VITE_API_BASE_URL`
3. El build se ejecutará automáticamente

## 🤝 Desarrollo

### Agregar Nuevas Funcionalidades
1. Crear componentes en `/src/components/`
2. Agregar páginas en `/src/pages/`
3. Extender el contexto si es necesario
4. Agregar rutas en `App.jsx`

### Estilo y Diseño
- Usar clases de TailwindCSS
- Seguir el sistema de colores establecido
- Mantener consistencia en espaciado y tipografía
- Implementar responsive design desde el inicio

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

---

**¡Disfruta desarrollando con este frontend moderno! 🎉**
