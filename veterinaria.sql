CREATE DATABASE IF NOT EXISTS veterinaria;
USE veterinaria;

-- ========================
-- PERSONAS
-- ========================
CREATE TABLE PERSONAS (
    carnet INT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    apellido VARCHAR(40) NOT NULL,
    celular VARCHAR(15),
    direccion VARCHAR(50),
    usuario VARCHAR(40) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);

-- ========================
-- CLIENTES
-- ========================
CREATE TABLE CLIENTES (
    carnetDue INT PRIMARY KEY,
    FOREIGN KEY (carnetDue) REFERENCES PERSONAS(carnet)
);

-- ========================
-- VETERINARIOS
-- ========================
CREATE TABLE VETERINARIOS (
    carnetVet INT PRIMARY KEY,
    especialidad VARCHAR(40),
    FOREIGN KEY (carnetVet) REFERENCES PERSONAS(carnet)
);

-- ========================
-- ESPECIES
-- ========================
CREATE TABLE ESPECIES (
    id_especie INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL
);

-- ========================
-- RAZAS
-- ========================
CREATE TABLE RAZAS (
    id_raza INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    id_especie INT,
    FOREIGN KEY (id_especie) REFERENCES ESPECIES(id_especie)
);

-- ========================
-- COLORES
-- ========================
CREATE TABLE COLORES (
    id_color INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL
);

-- ========================
-- MASCOTAS
-- ========================
CREATE TABLE MASCOTAS (
    id_mascota INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40) NOT NULL,
    id_color INT,
    id_raza INT,
    FOREIGN KEY (id_color) REFERENCES COLORES(id_color),
    FOREIGN KEY (id_raza) REFERENCES RAZAS(id_raza)
);

-- ========================
-- CLIENTES_MASCOTAS
-- ========================
CREATE TABLE CLIENTES_MASCOTAS (
    id_registroMasc INT AUTO_INCREMENT PRIMARY KEY,
    carnetDue INT,
    id_mascota INT,
    fecha_inicio DATE,
    fecha_fin DATE,
    FOREIGN KEY (carnetDue) REFERENCES CLIENTES(carnetDue),
    FOREIGN KEY (id_mascota) REFERENCES MASCOTAS(id_mascota)
);

-- ========================
-- ATENCIONES
-- ========================
CREATE TABLE ATENCIONES (
    id_atencion INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    descripcion VARCHAR(80),
    prox_fecha DATE,
    id_mascota INT,
    carnetVet INT,
    FOREIGN KEY (id_mascota) REFERENCES MASCOTAS(id_mascota),
    FOREIGN KEY (carnetVet) REFERENCES VETERINARIOS(carnetVet)
);

-- ========================
-- PRODUCTOS
-- ========================
CREATE TABLE PRODUCTOS (
    id_producto INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(40),
    descripcion VARCHAR(80),
    precio DECIMAL(10,2)
);

-- ========================
-- COMPRAS
-- ========================
CREATE TABLE COMPRAS (
    id_compra INT AUTO_INCREMENT PRIMARY KEY,
    id_producto INT,
    cantidad INT,
    fecha DATE,
    costo DECIMAL(10,2),
    id_mascota INT,
    carnetDue INT,
    FOREIGN KEY (id_producto) REFERENCES PRODUCTOS(id_producto),
    FOREIGN KEY (id_mascota) REFERENCES MASCOTAS(id_mascota),
    FOREIGN KEY (carnetDue) REFERENCES CLIENTES(carnetDue)
);