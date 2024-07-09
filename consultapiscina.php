<?php
require 'conexion.php'; // Incluir el archivo de conexión
// Consulta SQL

$sql = "SELECT * FROM piscina";
$result = $conexion->query($sql);

// Preparar datos en formato JSON
$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    var_dump($data);
}else{
    echo "mal";
}
$conexion->close();
?>