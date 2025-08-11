import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { ProductosProvider } from './context/ProductosContext';
import Navigation from './components/Navigation';

// Pages
import Home from './pages/Home';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto';
import FormularioProducto from './pages/FormularioProducto';
import Buscar from './pages/Buscar';

function App() {
  return (
    <ProductosProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/productos/nuevo" element={<FormularioProducto />} />
              <Route path="/productos/:id" element={<DetalleProducto />} />
              <Route path="/productos/:id/editar" element={<FormularioProducto />} />
              <Route path="/buscar" element={<Buscar />} />
              <Route path="*" element={
                <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                      Página no encontrada
                    </h2>
                    <p className="text-gray-600 mb-8">
                      La página que buscas no existe o ha sido movida.
                    </p>
                    <a
                      href="/"
                      className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Volver al inicio
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#fff',
              color: '#374151',
              fontWeight: '500',
              borderRadius: '0.75rem',
              border: '1px solid #e5e7eb',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#fff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </Router>
    </ProductosProvider>
  );
}

export default App;
