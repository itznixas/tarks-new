<?php
//Conexion a la base ded atos de MySQL
$server = "localhost";
$user = "root";
$pass = "root";
$db = "piscis";

$conn = new mysqli($server, $user, $pass, $db);

if ($conn->connect_errno){
    die("conn fallida" .$conn->connect_errno );
}

?>

