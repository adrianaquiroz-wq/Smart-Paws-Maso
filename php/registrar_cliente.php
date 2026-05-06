<?php
include("conexion.php");

// DATOS
$carnet = $_POST['carnetDue'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$usuario = $_POST['usuario'];
$fecha = $_POST['fecha_nacimiento']; // opcional si no está en PERSONAS
$direccion = $_POST['direccion'];

// 🔐 contraseña automática
$pass = substr(md5($usuario . time()), 0, 8);

// 1️⃣ PERSONA
$sql1 = "INSERT INTO PERSONAS 
(carnet, nombre, apellido, usuario, contrasena, direccion)
VALUES 
('$carnet', '$nombre', '$apellido', '$usuario', '$pass', '$direccion')";

if(!$conexion->query($sql1)){
    die("Error en PERSONAS: " . $conexion->error);
}

// 2️⃣ CLIENTE
$sql2 = "INSERT INTO CLIENTES (carnetDue)
VALUES ('$carnet')";

if(!$conexion->query($sql2)){
    die("Error en CLIENTES: " . $conexion->error);
}

echo "
Usuario: $usuario <br>
Contraseña: $pass
";
?>