<?php session_start(); require('core/autoload.php');

$gamesAll_q = $conn->query("SELECT COUNT(id) FROM quakechampions");
$gamesAll = number_format($gamesAll_q->fetchColumn());

$gamesToday_q = $conn->query("SELECT COUNT(id) FROM quakechampions WHERE `datetime` >=(DATE_SUB(now(), INTERVAL 24 HOUR))");
$gamesToday = number_format($gamesToday_q->fetchColumn());


/* JSON */
header('Content-Type: application/json');
echo json_encode([
    'games_all'   => $gamesAll,
    'games_today' => $gamesToday
]);
exit;

?>