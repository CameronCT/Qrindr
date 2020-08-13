<?php require_once('Core/Autoload.php'); $_POST = json_decode(file_get_contents('php://input'),true);

$err = "";
$msg = "";

if (!isset($_POST['secret']) || !isset($_POST['player']) || !isset($_POST['value']))
    exit;

$matchData = $conn->getDataFromMatchHash($_POST['hash']);

if (isset($_POST['value']) && !empty($_POST['value']) && $_POST['value'] == 9999)
    $err = 'Invalid step value!';

if ($_POST['secret'] != $matchData['matchSecret'])
    $err = "Invalid match secret!";

if ($matchData['matchPlayerOne'] != $_POST['player'] && $matchData['matchPlayerTwo'] != $_POST['player'])
    $err = "Invalid player name!";

if ($err == "") {
    $addStep = $conn->addStepToMatch($matchData['matchId'], (int) $_POST['value']);
    if ($addStep)
        $msg = "Step added successfully";
    else
        $err = "Unable to add step";
}

header('Content-Type: application/json');
echo json_encode([ 'error' => $err, 'success' => $msg ], true);
exit;