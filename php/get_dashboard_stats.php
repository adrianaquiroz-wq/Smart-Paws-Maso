<?php
include 'conexion.php';
header('Content-Type: application/json');

$hoy = date('Y-m-d');

// 1. Mascotas hoy (Contar cuántas mascotas distintas tienen cita hoy)
$resMascotas = mysqli_query($conexion, "SELECT COUNT(DISTINCT id_mascota) as total FROM citas WHERE fecha = '$hoy'");
$mascotasHoy = mysqli_fetch_assoc($resMascotas)['total'] ?? 0;

// 2. Citas pendientes (Total de citas con estado pendiente en el sistema)
$resCitas = mysqli_query($conexion, "SELECT COUNT(*) as total FROM citas WHERE LOWER(estado) = 'pendiente'"); 
$citasPendientes = mysqli_fetch_assoc($resCitas)['total'] ?? 0;

// 3. Clientes registrados
$resClientes = mysqli_query($conexion, "SELECT COUNT(*) as total FROM clientes");
$totalClientes = mysqli_fetch_assoc($resClientes)['total'] ?? 0;

// 4. Vacunas (Si no tienes la tabla aún, dejamos un 0 para que no rompa el JSON)
// Puedes activarlo luego: $resVacunas = mysqli_query($conexion, "SELECT COUNT(*) as total FROM historial_medico WHERE motivo LIKE '%Vacuna%' AND estado = 'Pendiente'");
$vacunasPendientes = 0; 

// 5. Próxima cita (La hora de la cita más cercana para HOY)
$resProxima = mysqli_query($conexion, "SELECT hora FROM citas WHERE fecha = '$hoy' AND LOWER(estado) = 'pendiente' ORDER BY hora ASC LIMIT 1");
$proximaFila = mysqli_fetch_assoc($resProxima);
$proxima = $proximaFila ? date("H:i", strtotime($proximaFila['hora'])) : "--:--";

echo json_encode([
    "mascotas_hoy" => $mascotasHoy,
    "citas_pendientes" => $citasPendientes,
    "total_clientes" => $totalClientes,
    "vacunas_pendientes" => $vacunasPendientes,
    "proxima_cita" => $proxima
]);
?>