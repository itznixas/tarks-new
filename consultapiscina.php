<?php
require 'conexion.php'; // Incluir el archivo de conexión

// Consulta SQL
$sql = "SELECT * FROM piscina";
$result = $conexion->query($sql);

// Preparar datos
$data = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = null;
}

$conexion->close();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>

<body>
    <div class="container">
        <h1>Muestra de piscina</h1>
        <?php if ($data): ?>
            <?php $element = $data[0]; // Suponiendo que solo necesitas el primer registro ?>
            <p><strong>Id: </strong><span id="idpiscina"><?php echo $element['idpiscina']; ?></span></p>
            <p><strong>Temperatura: </strong><span id="temperatura"><?php echo $element['temp']; ?></span></p>
            <p><strong>Salinas: </strong><span id="salinas"><?php echo $element['salina']; ?></span></p>
            <p><strong>Hora y fecha: </strong><span id="hora"><?php echo $element['fecha']; ?></span></p>
            <p><strong>Nombre del chip: </strong><span id="nombreChip"><?php echo $element['chip_name']; ?></span></p>
        <?php else: ?>
            <p>No se encontraron datos.</p>
        <?php endif; ?>
    </div>
</body>
</html>
