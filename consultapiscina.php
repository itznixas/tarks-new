<?php
require 'conexion.php';

// Verifica si se reciben parámetros GET
$idpiscina = isset($_GET['idpiscina']) ? intval($_GET['idpiscina']) : 0;

// Construye la consulta SQL con o sin filtro por idpiscina
if ($idpiscina > 0) {
    $sql = "SELECT p.idpiscina, p.temp, p.salina, p.fecha, c.chip_name
            FROM `prueba`.`piscina` p
            JOIN `prueba`.`tblchips` c ON p.idchips = c.idchips
            WHERE p.idpiscina = $idpiscina
            ORDER BY p.fecha DESC
            LIMIT 1;";
} else {
    $sql = "SELECT p.idpiscina, p.temp, p.salina, p.fecha, c.chip_name
            FROM `prueba`.`piscina` p
            JOIN `prueba`.`tblchips` c ON p.idchips = c.idchips
            ORDER BY p.fecha DESC
            LIMIT 1;";
}

$result = $conexion->query($sql);

// El contenido de la respuesta es un csv
header('Content-Type: text/csv');
header('Content-Disposition: attachment; filename="data.csv"');

$output = fopen('php://output', 'w');

// Guardar los datos en un csv
fputcsv($output, array('idpiscina', 'temp', 'salina', 'fecha', 'chip_name'));

// Salida de la fila
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }
} else {
    echo "No data found\n";
}

fclose($output);
$conexion->close();
?>
