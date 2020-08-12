<?php require_once('Core/Autoload.php'); $_POST = json_decode(file_get_contents('php://input'),true);

$err = "";
$msg = "";

if (!isset($_POST['secret']) || !isset($_POST['player']) || !isset($_POST['value'])
    exit;

$matchData = $conn->getDataFromMatchHash($_POST['hash']);

if ($_POST['secret'] != $matchData['matchSecret'])
    exit;

if ($matchData['playerOne'] != $_POST['player'] && $matchData['playerTwo'] != $_POST['player'])
    exit;

$addStep = $conn->addStepToMatch((int) $matchData['matchId'], (int) $_POST['value']));
if ($addStep)
    $msg = "Step added successfully";
else
    $err = "Unable to add step";

header('Content-Type: application/json');
echo json_encode([ error => $err, success => $msg ], true);
exit;