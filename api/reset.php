<?php session_start(); require('core/autoload.php'); $_POST = json_decode(file_get_contents('php://input'),true);

$err = null;
$msg = null;


if (!isset($_POST['uuid']) || empty($_POST['uuid'])) exit;
if (!isset($_POST['pwd']) || empty($_POST['pwd'])) exit;

$getReset = $conn->prepare("SELECT player1, player2 FROM quakechampions WHERE uuid = ? AND `password` = ?");
$getReset->execute(array($_POST['uuid'], $_POST['pwd']));
$fetchPlayers = $getReset->fetch(PDO::FETCH_ASSOC);

$reset = $conn->prepare("
    UPDATE quakechampions SET
        player1 = ?,
        player2 = ?,
        map_ban_1 = 0,
        map_ban_2 = 0,
        map_ban_3 = 0,
        map_ban_4 = 0,
        map_pick_1 = 0,
        map_pick_2 = 0,
        map_pick_3 = 0,
        map_pick_4 = 0,
        champ_ban_1 = 0,
        champ_ban_2 = 0,
        champ_ban_3 = 0,
        champ_ban_4 = 0,
        champ_ban_5 = 0,
        champ_pick_1 = 0,
        champ_pick_2 = 0,
        champ_pick_3 = 0,
        champ_pick_4 = 0,
        champ_pick_5 = 0,
        champ_pick_6 = 0,
        champ_pick_7 = 0,
        champ_pick_8 = 0,
        champ_pick_9 = 0,
        champ_pick_10 = 0,
        updated = ?
    WHERE
        uuid = ? AND password = ?
");
$reset->execute(array($fetchPlayers['player2'], $fetchPlayers['player1'], time(), $_POST['uuid'], $_POST['pwd']));

if ($reset->rowCount() > 0)
    $msg = "Match reset!";
else
    $err = "You are not a player in this match!";

/* JSON */
header('Content-Type: application/json');
echo json_encode([
    'error'     => $err,
    'success'   => $msg
]);
exit;

?>