<?php
include("conexion.php");

$usuario = $_POST['usuario'];
$contrasena = $_POST['contrasena'];
$rol = $_POST['rol'];

// Buscar usuario
$sql = "SELECT * FROM PERSONAS WHERE usuario = '$usuario' AND contrasena = '$contrasena'";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {

    $fila = $resultado->fetch_assoc();
    $carnet = $fila['carnet'];

    // Verificar rol
    if ($rol == "cliente") {
        $check = $conexion->query("SELECT * FROM CLIENTES WHERE carnetDue = $carnet");

        if ($check->num_rows > 0) {
            echo "cliente";
        } else {
            echo "no_rol";
        }
    }

    if ($rol == "veterinario") {
        $check = $conexion->query("SELECT * FROM VETERINARIOS WHERE carnetVet = $carnet");

        if ($check->num_rows > 0) {
            echo "veterinario";
        } else {
            echo "no_rol";
        }
    }

} else {
    echo "error";
}
?>