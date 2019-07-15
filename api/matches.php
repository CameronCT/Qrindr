<?php session_start(); require('core/autoload.php');

$getGames_q = $conn->query("SELECT id, uuid, player1, player2, `datetime` FROM quakechampions WHERE champ_ban_1 != 0 ORDER BY id DESC LIMIT 8");
$getGames = $getGames_q->fetchAll(PDO::FETCH_ASSOC);

$count = count($getGames);
for ($i = 0; $i < $count; $i++) {
    $getGames[$i]['jsDatetime'] = (strtotime($getGames[$i]['datetime']) * 1000);
}

/* JSON */
header('Content-Type: application/json');
echo json_encode($getGames);
exit;

?>