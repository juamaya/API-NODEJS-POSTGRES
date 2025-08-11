import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  HomeIcon,
  PlusIcon,
  ShoppingBagIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { to: '/', icon: HomeIcon, label: 'Inicio' },
    { to: '/productos', icon: ShoppingBagIcon, label: 'Productos' },
    { to: '/productos/nuevo', icon: PlusIcon, label: 'Nuevo' },
    { to: '/buscar', icon: MagnifyingGlassIcon, label: 'Buscar' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="bg-blue-300 shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
 <span className="text-xl font-bold   ">
              Juamaya  🚀 2025
            </span>

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <ShoppingBagIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
              ProductStore
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.to);
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    active
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${active ? 'text-primary-600' : 'text-gray-500'}`} />
                  <span className="hidden sm:block">{item.label}</span>
                  
                  {/* Active indicator */}
                  {active && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute inset-0 bg-primary-100 rounded-lg"
                      style={{ zIndex: -1 }}
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
