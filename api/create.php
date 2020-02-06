<?php session_start(); require('core/autoload.php'); $_POST = json_decode(file_get_contents('php://input'),true);

$err = null;
$msg = null;

$FIELDS = ['player1', 'player2', 'bestof', 'pwd'];

foreach ($FIELDS as $value) {
    if (!isset($_POST[$value]) || empty($_POST[$value]))
        $err = "The field '$value' cannot be empty!";
}

if ($_POST['bestof'] != 3 && $_POST['bestof'] != 5 || $_POST['bestof'] == "??")
    $_POST['bestof'] = 3;

if (strlen($_POST['pwd']) > 32)
    $err = "Your password cannot be greater than 32 characters!";

if (strlen($_POST['player1']) > 32 || strlen($_POST['player2']) > 32)
    $err = "Player names cannot be greater than 32 characters!";

if ($_POST['player1'] == $_POST['player2'])
    $err = "You cannot use the same player names!";

$checkExists = $conn->prepare("SELECT COUNT(id) FROM quakechampions WHERE uuid = ?");
$checkExists->execute(array($_SESSION['unique']));

if ($checkExists->fetchColumn() > 0)
    $err = "You already have a match that exists, please close it before starting a new one!";

if (!$err || $err == null) {
    $create = $conn->prepare("INSERT INTO quakechampions ( uuid, player1, player2, `password`, decider, bestof ) VALUES ( ?, ?, ?, ?, ?, ? )");
    $create->execute(array($_SESSION['unique'], $_POST['player1'], $_POST['player2'], md5($_POST['pwd']), $_POST['decider'], $_POST['bestof']));

    if ($create->rowCount() > 0)
        $msg = $_SESSION['unique'];

}

/* JSON */
header('Content-Type: application/json');
echo json_encode([
    'error'     => $err,
    'success'   => $msg
]);
exit;

?>