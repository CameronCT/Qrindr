<?php

/* Connect to a MySQL database using driver invocation */
$dsn = 'mysql:dbname=mydb;host=localhost';
$user = 'root';
$password = '';

try {
    $conn = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}


?>