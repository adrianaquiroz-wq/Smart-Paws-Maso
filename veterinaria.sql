-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-05-2026 a las 05:32:29
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `veterinaria`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `atenciones`
--

CREATE TABLE `atenciones` (
  `id_atencion` int(11) NOT NULL,
  `id_cita` int(11) DEFAULT NULL,
  `fecha` date NOT NULL,
  `diagnostico` text DEFAULT NULL,
  `prox_fecha` date DEFAULT NULL,
  `carnetVet` int(11) DEFAULT NULL,
  `asistente_nombre` varchar(100) DEFAULT NULL,
  `asistente_relacion` varchar(50) DEFAULT NULL,
  `peso_kg` decimal(5,2) DEFAULT NULL,
  `temperatura` decimal(4,1) DEFAULT NULL,
  `frecuencia_cardiaca` int(11) DEFAULT NULL,
  `tratamiento` text DEFAULT NULL,
  `observaciones` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `citas`
--

CREATE TABLE `citas` (
  `id_cita` int(11) NOT NULL,
  `id_mascota` int(11) NOT NULL,
  `carnetDue` int(11) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `motivo` varchar(100) DEFAULT NULL,
  `estado` enum('Pendiente','Confirmada','Cancelada','Atendida') DEFAULT 'Pendiente',
  `carnetVet` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `citas`
--


--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `carnetDue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--
--------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes_mascotas`
--

CREATE TABLE `clientes_mascotas` (
  `id_registroMasc` int(11) NOT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `id_mascota` int(11) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes_mascotas`

--
-- Estructura de tabla para la tabla `colores`
--

CREATE TABLE `colores` (
  `id_color` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `colores`
--

INSERT INTO `colores` (`id_color`, `nombre`) VALUES
(1, 'Negro'),
(2, 'Blanco'),
(3, 'Marrón'),
(4, 'Blanco'),
(5, 'Naranja'),
(6, 'Cafe'),
(7, 'Rojo'),
(8, 'Azul'),
(9, 'Amarillo'),
(10, 'Celeste'),
(11, 'Verde'),
(12, 'Rosa'),
(13, 'Gris');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `compras`
--

CREATE TABLE `compras` (
  `id_compra` int(11) NOT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  `id_mascota` int(11) DEFAULT NULL,
  `carnetDue` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especies`
--

CREATE TABLE `especies` (
  `id_especie` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `especies`
--

INSERT INTO `especies` (`id_especie`, `nombre`) VALUES
(1, 'Perro'),
(2, 'Gato'),
(3, 'Conejo'),
(4, 'Ave'),
(5, 'Reptil');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id_mascota` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `id_color` int(11) DEFAULT NULL,
  `id_raza` int(11) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `peso` decimal(5,2) DEFAULT NULL,
  `tamano` varchar(20) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `alergias` text DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `estado` varchar(20) DEFAULT 'activo'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

-- Estructura de tabla para la tabla `personas`
--

CREATE TABLE `personas` (
  `carnet` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `apellido` varchar(40) NOT NULL,
  `celular` varchar(15) DEFAULT NULL,
  `direccion` varchar(50) DEFAULT NULL,
  `usuario` varchar(40) NOT NULL,
  `contrasena` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `personas`
--
-----------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

CREATE TABLE `razas` (
  `id_raza` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `id_especie` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `razas`
--

INSERT INTO `razas` (`id_raza`, `nombre`, `id_especie`) VALUES
(1, 'Labrador', 1),
(2, 'Bulldog', 1),
(3, 'Pastor Alemán', 1),
(4, 'Poodle', 1),
(5, 'Chihuahua', 1),
(6, 'Siames', 2),
(7, 'Persa', 2),
(8, 'Maine Coon', 2),
(9, 'Bengalí', 2),
(10, 'Holandés Enano', 3),
(11, 'Cabeza de León', 3),
(12, 'Canario', 4),
(13, 'Loro Amazónico', 4),
(14, 'Iguana Verde', 5),
(15, 'Gecko Leopardo', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `veterinarios`
--

CREATE TABLE `veterinarios` (
  `carnetVet` int(11) NOT NULL,
  `especialidad` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--dices para tablas volcadas
--

--
-- Indices de la tabla `atenciones`
--
ALTER TABLE `atenciones`
  ADD PRIMARY KEY (`id_atencion`),
  ADD KEY `carnetVet` (`carnetVet`),
  ADD KEY `fk_atencion_cita` (`id_cita`);

--
-- Indices de la tabla `citas`
--
ALTER TABLE `citas`
  ADD PRIMARY KEY (`id_cita`),
  ADD KEY `fk_cita_mascota` (`id_mascota`),
  ADD KEY `fk_cita_cliente` (`carnetDue`),
  ADD KEY `fk_cita_veterinario` (`carnetVet`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`carnetDue`);

--
-- Indices de la tabla `clientes_mascotas`
--
ALTER TABLE `clientes_mascotas`
  ADD PRIMARY KEY (`id_registroMasc`),
  ADD KEY `carnetDue` (`id_cliente`),
  ADD KEY `id_mascota` (`id_mascota`);

--
-- Indices de la tabla `colores`
--
ALTER TABLE `colores`
  ADD PRIMARY KEY (`id_color`);

--
-- Indices de la tabla `compras`
--
ALTER TABLE `compras`
  ADD PRIMARY KEY (`id_compra`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_mascota` (`id_mascota`),
  ADD KEY `carnetDue` (`carnetDue`);

--
-- Indices de la tabla `especies`
--
ALTER TABLE `especies`
  ADD PRIMARY KEY (`id_especie`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id_mascota`),
  ADD KEY `id_color` (`id_color`),
  ADD KEY `id_raza` (`id_raza`);

--
-- Indices de la tabla `personas`
--
ALTER TABLE `personas`
  ADD PRIMARY KEY (`carnet`),
  ADD UNIQUE KEY `unique_usuario` (`usuario`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- Indices de la tabla `razas`
--
ALTER TABLE `razas`
  ADD PRIMARY KEY (`id_raza`),
  ADD KEY `id_especie` (`id_especie`);

--
-- Indices de la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD PRIMARY KEY (`carnetVet`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `atenciones`
--
ALTER TABLE `atenciones`
  MODIFY `id_atencion` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `citas`
--
ALTER TABLE `citas`
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `clientes_mascotas`
--
ALTER TABLE `clientes_mascotas`
  MODIFY `id_registroMasc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `colores`
--
ALTER TABLE `colores`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `especies`
--
ALTER TABLE `especies`
  MODIFY `id_especie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `id_raza` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `atenciones`
--
ALTER TABLE `atenciones`
  ADD CONSTRAINT `atenciones_ibfk_2` FOREIGN KEY (`carnetVet`) REFERENCES `veterinarios` (`carnetVet`),
  ADD CONSTRAINT `fk_atencion_cita` FOREIGN KEY (`id_cita`) REFERENCES `citas` (`id_cita`);

--
-- Filtros para la tabla `citas`
--
ALTER TABLE `citas`
  ADD CONSTRAINT `fk_cita_cliente` FOREIGN KEY (`carnetDue`) REFERENCES `clientes` (`carnetDue`),
  ADD CONSTRAINT `fk_cita_mascota` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id_mascota`),
  ADD CONSTRAINT `fk_cita_veterinario` FOREIGN KEY (`carnetVet`) REFERENCES `veterinarios` (`carnetVet`);

--
-- Filtros para la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD CONSTRAINT `clientes_ibfk_1` FOREIGN KEY (`carnetDue`) REFERENCES `personas` (`carnet`);

--
-- Filtros para la tabla `clientes_mascotas`
--
ALTER TABLE `clientes_mascotas`
  ADD CONSTRAINT `clientes_mascotas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`carnetDue`),
  ADD CONSTRAINT `clientes_mascotas_ibfk_2` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id_mascota`);

--
-- Filtros para la tabla `compras`
--
ALTER TABLE `compras`
  ADD CONSTRAINT `compras_ibfk_1` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id_producto`),
  ADD CONSTRAINT `compras_ibfk_2` FOREIGN KEY (`id_mascota`) REFERENCES `mascotas` (`id_mascota`),
  ADD CONSTRAINT `compras_ibfk_3` FOREIGN KEY (`carnetDue`) REFERENCES `clientes` (`carnetDue`);

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `mascotas_ibfk_1` FOREIGN KEY (`id_color`) REFERENCES `colores` (`id_color`),
  ADD CONSTRAINT `mascotas_ibfk_2` FOREIGN KEY (`id_raza`) REFERENCES `razas` (`id_raza`);

--
-- Filtros para la tabla `razas`
--
ALTER TABLE `razas`
  ADD CONSTRAINT `razas_ibfk_1` FOREIGN KEY (`id_especie`) REFERENCES `especies` (`id_especie`);

--
-- Filtros para la tabla `veterinarios`
--
ALTER TABLE `veterinarios`
  ADD CONSTRAINT `veterinarios_ibfk_1` FOREIGN KEY (`carnetVet`) REFERENCES `personas` (`carnet`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
