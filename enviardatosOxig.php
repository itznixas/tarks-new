
<?php
require 'conexion.php';

// Verifica si se reciben parámetros GET
$idSens = $_GET["idSensT"] ?? 1; 

$sql = "SELECT 
    p.nomPiscina, 
    s.marcaSensor, 
    r.tmpUnixRegOxig, 
    r.valOxig 
FROM 
    tblregoxig r
INNER JOIN 
    tblsensores s ON r.idSensorOxig = s.idSensor
INNER JOIN 
    tblpiscinas p ON s.ubicSensor = p.idPiscina
WHERE 
    r.tmpUnixRegOxig = (
        SELECT 
            MAX(tmpUnixRegOxig) 
        FROM 
            tblregoxig 
        WHERE 
            idSensorOxig = s.idSensor
    )
ORDER BY 
    r.tmpUnixRegOxig DESC 
LIMIT 1";

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