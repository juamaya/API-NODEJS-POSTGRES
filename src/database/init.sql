-- Crear la base de datos (ejecutar como superusuario)
-- CREATE DATABASE productos_db;

-- Usar la base de datos productos_db

-- Crear tabla de productos
CREATE TABLE IF NOT EXISTS productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10, 2) NOT NULL,
    categoria VARCHAR(100),
    stock INTEGER DEFAULT 0,
    imagen_url VARCHAR(500),
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_productos_categoria ON productos(categoria);
CREATE INDEX IF NOT EXISTS idx_productos_activo ON productos(activo);
CREATE INDEX IF NOT EXISTS idx_productos_nombre ON productos(nombre);

-- Insertar algunos productos de ejemplo
INSERT INTO productos (nombre, descripcion, precio, categoria, stock, imagen_url) VALUES
('Laptop HP Pavilion', 'Laptop HP Pavilion 15.6" Intel Core i5, 8GB RAM, 256GB SSD', 599.99, 'Electrónicos', 15, 'https://example.com/laptop-hp.jpg'),
('Mouse Logitech MX Master', 'Mouse inalámbrico ergonómico para productividad', 79.99, 'Electrónicos', 25, 'https://example.com/mouse-logitech.jpg'),
('Teclado Mecánico RGB', 'Teclado mecánico gaming con retroiluminación RGB', 129.99, 'Electrónicos', 10, 'https://example.com/teclado-rgb.jpg'),
('Monitor 24" Full HD', 'Monitor LED 24 pulgadas resolución 1920x1080', 199.99, 'Electrónicos', 8, 'https://example.com/monitor-24.jpg'),
('Auriculares Sony WH-1000XM4', 'Auriculares inalámbricos con cancelación de ruido', 349.99, 'Audio', 12, 'https://example.com/auriculares-sony.jpg');

-- Crear función para actualizar fecha de modificación automáticamente
CREATE OR REPLACE FUNCTION actualizar_fecha_modificacion()
RETURNS TRIGGER AS $$
BEGIN
    NEW.fecha_actualizacion = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Crear trigger para actualizar automáticamente la fecha de modificación
CREATE TRIGGER trigger_actualizar_fecha_modificacion
    BEFORE UPDATE ON productos
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_fecha_modificacion();
