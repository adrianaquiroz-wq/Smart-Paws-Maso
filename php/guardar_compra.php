<?php
// php/guardar_compra.php
// Registra la compra y descuenta el stock
header('Content-Type: application/json');
session_start();
require_once 'conexion.php';

$body = json_decode(file_get_contents('php://input'), true);
if (!$body || empty($body['items'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Sin items']);
    exit;
}

$carnetDue = $_SESSION['carnet'] ?? null; // null si no está logueado
$fecha     = date('Y-m-d');

$conexion->begin_transaction();

try {
    $stmtCompra = $conexion->prepare(
        "INSERT INTO compras (id_producto, cantidad, fecha, costo, carnetDue) 
         VALUES (?, ?, ?, ?, ?)"
    );
    $stmtStock = $conexion->prepare(
        "UPDATE productos SET stock = stock - ? WHERE id_producto = ? AND stock >= ?"
    );

    foreach ($body['items'] as $item) {
        $id       = (int)   $item['id_producto'];
        $cant     = (int)   $item['cantidad'];
        $costo    = (float) $item['costo'];

        // Descontar stock
        $stmtStock->bind_param('iii', $cant, $id, $cant);
        $stmtStock->execute();
        if ($stmtStock->affected_rows === 0) {
            throw new Exception("Stock insuficiente para producto $id");
        }

        // Registrar compra
        $stmtCompra->bind_param('iiidi', $id, $cant, $fecha, $costo, $carnetDue);
        $stmtCompra->execute();
    }

    $conexion->commit();
    echo json_encode(['ok' => true]);

} catch (Exception $e) {
    $conexion->rollback();
    http_response_code(409);
    echo json_encode(['error' => $e->getMessage()]);
}

$conexion->close();
?>
