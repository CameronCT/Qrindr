<?php session_start(); require('core/autoload.php'); $_POST = json_decode(file_get_contents('php://input'),true);



/* JSON headers */
header('Content-Type: application/json');
echo json_encode([
    'error'     => $err,
    'success'   => $msg
]);
exit;

?>
