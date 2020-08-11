<?php require_once('Core/Autoload.php');

if (!isset($_GET['hash']))
    exit;

$matchId = $conn->getMatchIdFromHash($_GET['hash']);