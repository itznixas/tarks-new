
<?php
require 'conexion.php';

// Verifica si se reciben parámetros GET
$idSens = $_GET["idSensT"] ?? 1; 

$sql = "SELECT 
    p.nomPiscina, 
    s.marcaSensor, 
    r.tmpUnixRegPh, 
    r.valPh 
FROM 
    tblregph r
INNER JOIN 
    tblsensores s ON r.idSensorPh = s.idSensor
INNER JOIN 
    tblpiscinas p ON s.ubicSensor = p.idPiscina
WHERE 
    r.tmpUnixRegPh = (
        SELECT 
            MAX(tmpUnixRegPh) 
        FROM 
            tblregph
        WHERE 
            idSensorPh = s.idSensor
    )
ORDER BY 
    r.tmpUnixRegPh DESC 
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