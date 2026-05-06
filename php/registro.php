<?php
include("conexion.php");

$carnet = $_POST['carnet'];
$nombre = $_POST['nombre'];
$apellido = $_POST['apellido'];
$correo = $_POST['correo'];
$password = $_POST['password'];
$rol = $_POST['rol'];

// Verificar si ya existe
$check = $conexion->query("SELECT * FROM PERSONAS WHERE carnet='$carnet' OR usuario='$correo'");

if ($check->num_rows > 0) {
    echo "El usuario ya existe";
    exit;
}

// Insertar persona
$sql = "INSERT INTO PERSONAS (carnet, nombre, apellido, celular, direccion, usuario, contrasena)
        VALUES ('$carnet', '$nombre', '$apellido', '', '', '$correo', '$password')";

if ($conexion->query($sql)) {

    // Insertar rol
    if ($rol == "cliente") {
        $conexion->query("INSERT INTO CLIENTES VALUES ($carnet)");
    } else {
        $conexion->query("INSERT INTO VETERINARIOS VALUES ($carnet, 'General')");
    }

    echo "ok";
} else {
    echo "Error al registrar";
}
?>