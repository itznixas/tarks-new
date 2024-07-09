<?php
//Conexion a la base ded atos de MySQL
$server = "localhost";
$user = "root";
$pass = "root";
$db = "prueba";

$conexion = new mysqli($server, $user, $pass, $db);

if ($conexion->connect_errno){
    die("Conexion fallida" .$conexion->connect_errno );
}else{
    echo"Conectado";
}

?>