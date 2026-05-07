<?php
include("conexion.php");

if(!isset($_GET['ci'])){
    echo json_encode([]);
    exit;
}

$ci = $_GET['ci'];

$sql = "
SELECT 
    m.id_mascota,
    m.nombre,
    m.foto,
    r.nombre AS raza

FROM clientes_mascotas cm

INNER JOIN mascotas m
ON cm.id_mascota = m.id_mascota

INNER JOIN razas r
ON m.id_raza = r.id_raza

WHERE cm.id_cliente = '$ci'
AND cm.fecha_fin IS NULL
";

$result = $conexion->query($sql);

$data = [];

while($row = $result->fetch_assoc()){
    $data[] = $row;
}

echo json_encode($data);
?>