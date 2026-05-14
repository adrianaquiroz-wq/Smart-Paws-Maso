

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


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
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `carnetDue` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
-
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

--
-- Volcado de datos para la tabla `compras`
--
 --------------------------------------------------------

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
--------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(40) DEFAULT NULL,
  `descripcion` varchar(80) DEFAULT NULL,
  `precio` decimal(10,2) DEFAULT NULL,
  `stock` int(11) DEFAULT 0,
  `imagen` varchar(255) DEFAULT NULL,
  `categoria` varchar(40) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `imagen`, `categoria`) VALUES
(1, 'Pro Plan Adulto 3kg', 'Alimento balanceado premium para perros adultos', 185.00, 12, 'https://d34xtejqjqcp3x.cloudfront.net/store/d3ed875c04ea93a088da60d182535b9f.webp', 'Alimento'),
(2, 'Royal Canin Gato 1.5kg', 'Nutrición específica para gatos domésticos', 135.00, 8, 'https://d34xtejqjqcp3x.cloudfront.net/store/f890525b942c7e3f9734f4126749fac6.webp', 'Alimento'),
(3, 'Shampoo Neutro 500ml', 'Shampoo suave sin parabenos para todo tipo de pelo', 35.00, 20, 'https://d34xtejqjqcp3x.cloudfront.net/store/a963e1560fdc2390924170fd0c7d0bed.webp', 'Higiene'),
(4, 'Cepillo Desmallador', 'Reduce enredos y caída de pelo eficientemente', 28.00, 15, 'https://m.media-amazon.com/images/S/aplus-media-library-service-media/4eb844b5-caae-46e4-8811-09d5e8da4419.__AC_SR166,182___.jpg', 'Higiene'),
(5, 'Cuerda Trenzada Resistente', 'Juguete dental de cuerda para perros medianos', 22.00, 30, 'https://m.media-amazon.com/images/I/81V3yf82dcL._AC_UF400,400_QL80_.jpg', 'Juguetes'),
(6, 'Pelota Interactiva', 'Pelota con sonido para gatos y perros pequeños', 18.00, 25, 'https://media.falabella.com/falabellaPE/138428445_01/w=1500,h=1500,fit=cover', 'Juguetes'),
(7, 'Plato Acero Inoxidable', 'Antideslizante, apto para lavavajillas', 30.00, 9, 'https://petkorp.com/wp-content/uploads/2023/02/AP-D003-043_2.webp', 'Accesorios'),
(8, 'Correa Retráctil 5m', 'Con freno de bloqueo y mango ergonómico', 65.00, 6, 'https://media.adeo.com/mkp/62680a51ac8de070d5a053670aee18e4/media.jpeg', 'Accesorios'),
(9, 'Cama Acolchada Talla L', 'Relleno de fibra suave, funda lavable', 120.00, 4, 'https://tottoco.vtexassets.com/arquivos/ids/514234/PDCBCA1009.jpg', 'Camas'),
(10, 'Cama Cáscara de Nuez M', 'Diseño nórdico, antideslizante, súper suave', 95.00, 0, 'https://acdn-us.mitiendanube.com/stores/880/994/products/cama-nordico-pet-max-bbb870bbbc9c95738f17214116333463-1024-1024.webp', 'Camas');

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

--
-- Volcado de datos para la tabla `veterinarios`
--

INSERT INTO `veterinarios` (`carnetVet`, `especialidad`) VALUES
(555666, 'General'),
(9244226, 'General');

--
-- Índices para tablas volcadas
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
  MODIFY `id_cita` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `clientes_mascotas`
--
ALTER TABLE `clientes_mascotas`
  MODIFY `id_registroMasc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `colores`
--
ALTER TABLE `colores`
  MODIFY `id_color` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `compras`
--
ALTER TABLE `compras`
  MODIFY `id_compra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `especies`
--
ALTER TABLE `especies`
  MODIFY `id_especie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id_mascota` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

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
