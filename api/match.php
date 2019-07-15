<?php session_start(); require('core/autoload.php'); $_POST = json_decode(file_get_contents('php://input'),true);

$err = null;
$msg = null;
$type = null;

/* Convert Angular Pick to INT */
$_POST['pick'] = (int) $_POST['pick'];

if ($_POST['status'] != 'pick' && $_POST['status'] != 'ban') exit;
if (!isset($_POST['uuid'])) exit;
if (!is_int($_POST['id']) || !is_int($_POST['pick'])) exit;
if (isset($_POST['pick']) && !empty($_POST['pick'])) {
    if ($_POST['type'] == "map")
        if ($_POST['pick'] < 1 || $_POST['pick'] > 7) exit;
    elseif ($_POST['type'] == "champ")
        if ($_POST['pick'] < 1 || $_POST['pick'] > 16) exit;
} else exit;
if (isset($_POST['pick']) && $_POST['pick'] == "??") exit;
if (!isset($_POST['pwd']) || empty($_POST['pwd'])) exit;

if (!isset($_POST['pick']) || empty($_POST['pick'])) exit;
if (isset($_POST['type']) && !empty($_POST['type'])) 
    if ($_POST['type'] != "map" && $_POST['type'] != "champ") exit;

$status =       $_POST['status'];
$id =           (int) $_POST['id'];
$pick =         (int) $_POST['pick'];
$type =         $_POST['type'];
$updated =      time();
    
$string = $type . "_" . $status . "_" . $id;
$updateMatch = $conn->prepare("UPDATE quakechampions SET $string = ?, updated = ? WHERE uuid = ? AND `password` = ?");
$updateMatch->execute(array($pick, $updated, $_POST['uuid'], $_POST['pwd']));

if ($updateMatch->rowCount() > 0)
    $msg = "Success";
else
    $err = "You are not a part of this match!";

/* JSON headers */
header('Content-Type: application/json');
echo json_encode([
    'error'     => $err,
    'success'   => $msg
]);
exit;

?>
