<?php
require_once('Core/Autoload.php');

if (!isset($_GET['name']) || empty($_GET['name']))
    exit;

/*
 * get Data
 */
$data = $conn->searchMatches($_GET['name']);

/*
* JSON
*/
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
echo json_encode($data);
exit;