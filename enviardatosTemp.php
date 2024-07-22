
<?php
require 'conexion.php';

// Verifica si se reciben parámetros GET
$idSens = $_GET["idSensT"] ?? 1; 

$sql = "SELECT 
    p.nomPiscina, 
    s.marcaSensor, 
    r.tmpUnixRegTemp, 
    r.valTemp
FROM 
    tblregtemp r
INNER JOIN 
    tblsensores s ON r.idSensorTemp = s.idSensor
INNER JOIN 
    tblpiscinas p ON s.ubicSensor = p.idPiscina
WHERE 
    r.tmpUnixRegTemp = (
        SELECT 
            MAX(tmpUnixRegTemp) 
        FROM 
            tblregtemp
        WHERE 
            idSensorTemp = s.idSensor
    )
ORDER BY 
    r.tmpUnixRegTemp   DESC 
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