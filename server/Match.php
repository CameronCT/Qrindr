<?php
require_once('Core/Autoload.php');
require_once('Data/Games.php');

$data = [];

if (!isset($_GET['hash']))
    exit;

/*
 * Create matchData
 */
$matchData = $conn->getDataFromMatchHash($_GET['hash']);
$matchSteps = $conn->getStepsFromMatchId($matchData['matchId']);
require_once('Data/Games/' . $games[$matchData['matchConfig']]['configFile'] . '.php');

/*
 * Add Missing Data
 */
$game['matchId']                =   $matchData['matchId'];
$game['matchPlayerOne']         =   $matchData['matchPlayerOne'];
$game['matchPlayerTwo']         =   $matchData['matchPlayerTwo'];
$game['matchCointoss']          =   $matchData['matchCointoss'];
$game['matchFormat']            =   $matchData['matchFormat'];

/*
 * Add Match Steps
 */
$countSteps = count($matchSteps);
for ($i = 0; $i < $countSteps; $i++) {
    array_push($game['matchSteps']['values'], $matchSteps[$i]);

    /* TO-DO: Assign data to matchChampions/matchMaps picked / available */
}
$game['matchSteps']['values']  =   $matchSteps;

/*
* JSON
*/
header('Content-Type: application/json');
echo json_encode($game, true);
exit;