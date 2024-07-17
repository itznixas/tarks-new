
<?php
require 'conexion.php';

// Verifica si se reciben parámetros GET
$idSens = $_GET["idSensT"] ?? 1; 

$sql = "SELECT nomPiscina, marcaSensor, tmpUnixRegTemp, valPh FROM (tblsensores INNER JOIN tblpiscinas ON ubicSensor = idPiscina) INNER JOIN tblregtemp ON idSensor = $idSens ORDER BY tmpUnixRegTemp DESC LIMIT 1";

$result = $conn->query($sql);


$data = array();
// Salida de la fila
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        
        $data[] = $row;
    }
} 

$respjson = json_encode($data);
header('Content-Type: application/json');
echo $respjson;

$conn->close();
?>