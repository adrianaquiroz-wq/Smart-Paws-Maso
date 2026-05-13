<?php
session_start();
include("conexion.php");

if (!isset($_SESSION['carnet'])) {
    die("No autorizado");
}

$carnetDue = $_SESSION['carnet'];
$id_mascota = $_POST['id_mascota'];
$fecha = $_POST['fecha'];
$hora = $_POST['hora'];
$motivo = $_POST['motivo'];

// Estado por defecto: 'Pendiente'
$sql = "INSERT INTO citas (id_mascota, carnetDue, fecha, hora, motivo, estado) 
        VALUES ('$id_mascota', '$carnetDue', '$fecha', '$hora', '$motivo', 'Pendiente')";

if ($conexion->query($sql)) {
    echo "ok";
} else {
    echo "Error en la base de datos: " . $conexion->error;
}
?>