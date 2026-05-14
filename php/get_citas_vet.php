
<?php
//get_citas_vet.php
include 'conexion.php'; // Asegúrate de que el nombre sea correcto
// Esto convierte tu PHP en una "API" que el calendario puede leer
header('Content-Type: application/json');
// En un sistema real, aquí filtrarías por el carnet del veterinario logueado
// $carnetVet = $_SESSION['carnetVet']; 

$sql = "SELECT c.id_cita, c.fecha, c.hora, m.nombre as mascota, c.motivo 
        FROM citas c
        JOIN mascotas m ON c.id_mascota = m.id_mascota
        WHERE LOWER(c.estado) = 'pendiente'
        ORDER BY c.fecha ASC, c.hora ASC"; // Solo mostrar las que no se han atendido

$resultado = mysqli_query($conexion, $sql);
$eventos = [];

while($fila = mysqli_fetch_assoc($resultado)) {
    $eventos[] = [
        'id'    => $fila['id_cita'],
        'title' => $fila['mascota'],
        'start' => $fila['fecha'] . "T" . $fila['hora'], // Formato ISO para FullCalendar
        'description' => $fila['motivo'], // Guardamos el detalle aquí
        'color' => '#2ecc71' // Color verde para las citas
    ];
}

echo json_encode($eventos);
?>