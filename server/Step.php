<?php require_once('Core/Autoload.php'); $_POST = json_decode(file_get_contents('php://input'),true);

$err = "";
$msg = "";
$matchData = [];

if (!isset($_POST['secret']) || !isset($_POST['player']) || !isset($_POST['value']) || !isset($_POST['hash']))
    $err = "Invalid secret, player or value!";

if (isset($_POST['hash']))
    $matchData = $conn->getDataFromMatchHash($_POST['hash']);

if (!$matchData)
    $err = "Invalid match hash!";
else {
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
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
echo json_encode([ 'error' => $err, 'success' => $msg ], true);
exit;