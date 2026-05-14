<?php
include 'conexion.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_cita = $_POST['id_cita'];
    $asistente_nombre = $_POST['asistente_nombre'];
    $asistente_relacion = $_POST['asistente_relacion'];
    $peso_kg = $_POST['peso_kg'];
    $temperatura = $_POST['temperatura'];
    $frecuencia_cardiaca = $_POST['frecuencia_cardiaca'];
    $diagnostico = $_POST['diagnostico'];
    $tratamiento = $_POST['tratamiento'];
    $prox_fecha = !empty($_POST['prox_fecha']) ? "'".$_POST['prox_fecha']."'" : "NULL";
    
    // IMPORTANTE: Según image_dbcf7a.jpg tu tabla pide carnetVet. 
    // Si no tienes sesión, usaremos uno genérico por ahora.
    $carnetVet = "1234567"; 

    // Especificamos las columnas para evitar errores de orden
    $sqlAtencion = "INSERT INTO atenciones 
    (id_cita, diagnostico, prox_fecha, carnetVet, asistente_nombre, asistente_relacion, peso_kg, temperatura, frecuencia_cardiaca, tratamiento) 
    VALUES 
    ('$id_cita', '$diagnostico', $prox_fecha, '$carnetVet', '$asistente_nombre', '$asistente_relacion', '$peso_kg', '$temperatura', '$frecuencia_cardiaca', '$tratamiento')";

    if (mysqli_query($conexion, $sqlAtencion)) {
        // Actualizar el estado de la cita
        $sqlActualizarCita = "UPDATE citas SET estado = 'completado' WHERE id_cita = '$id_cita'";
        mysqli_query($conexion, $sqlActualizarCita);
        
        echo "success";
    } else {
        // Esto te dirá exactamente qué columna está fallando
        echo "Error en la base de datos: " . mysqli_error($conexion);
    }
}
?>