<?php

$dsn = 'mysql:dbname=mydb;host=qrindr_db_1';
$user = 'root';
$password = '';

try {
    $conn = new PDO($dsn, $user, $password);
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
