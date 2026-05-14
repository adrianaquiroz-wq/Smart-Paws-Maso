<?php
//get_dashboard_stats.php

include 'conexion.php';
header('Content-Type: application/json');

$hoy = date('Y-m-d');

// 1. Mascotas hoy (Citas únicas para hoy)
$resMascotas = mysqli_query($conexion, "SELECT COUNT(DISTINCT id_mascota) as total FROM citas WHERE fecha = '$hoy'");
$mascotasHoy = mysqli_fetch_assoc($resMascotas)['total'];

// 2. Citas pendientes (Estado pendiente para hoy en adelante)
$resCitas = mysqli_query($conexion, "SELECT COUNT(*) as total FROM citas WHERE LOWER(estado) = 'pendiente'"); 
$citasPendientes = mysqli_fetch_assoc($resCitas)['total'];

// 3. Clientes registrados (Total histórico)
$resClientes = mysqli_query($conexion, "SELECT COUNT(*) as total FROM clientes");
$totalClientes = mysqli_fetch_assoc($resClientes)['total'];

// 4. Vacunas pendientes (Ejemplo: historial médico con tipo 'Vacuna' y estado 'Pendiente')
// Ajusta los nombres de tabla/columna según tu DB
$resVacunas = mysqli_query($conexion, "SELECT COUNT(*) as total FROM historial_medico WHERE tipo = 'Vacuna' AND estado = 'Pendiente'");
$vacunasPendientes = mysqli_fetch_assoc($resVacunas)['total'];

// 5. Próxima cita (La más cercana hoy)
$resProxima = mysqli_query($conexion, "SELECT hora FROM citas WHERE fecha = '$hoy' AND estado = 'pendiente' ORDER BY hora ASC LIMIT 1");
$proximaHora = mysqli_fetch_assoc($resProxima);
$proxima = $proximaHora ? date("H:i", strtotime($proximaHora['hora'])) : "--:--";

echo json_encode([
    "mascotas_hoy" => $mascotasHoy,
    "citas_pendientes" => $citasPendientes,
    "total_clientes" => $totalClientes,
    "vacunas_pendientes" => $vacunasPendientes,
    "proxima_cita" => $proxima
]);
?>