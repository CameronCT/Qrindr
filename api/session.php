<?php session_start(); 

$_SESSION['unique'] = md5(microtime().rand());

header('Content-Type: application/json');
echo json_encode($_SESSION);
exit;

?>