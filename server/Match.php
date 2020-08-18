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
 * Validate Data
 */

/*
 * Add Missing Data
 */
$game['matchId']                =   $matchData['matchId'];
$game['matchHash']              =   $matchData['matchHash'];
$game['matchPlayerOne']         =   $matchData['matchPlayerOne'];
$game['matchPlayerTwo']         =   $matchData['matchPlayerTwo'];
$game['matchCointoss']          =   $matchData['matchCointoss'];
$game['matchFormat']            =   $matchData['matchFormat'];

/*
 * Add Match Steps
 */
$countSteps = count($matchSteps);
for ($i = 0; $i < $countSteps; $i++) {

    $currentMatchStep           = intval($matchSteps[$i]['matchStepValue']);
    $currentMatchStepString     = $matchSteps[$i]['matchStepValue'];

    // Push Values to Data
    array_push($game['matchSteps']['values'], $currentMatchStep);

    // Update Steps (next)
    $game['matchSteps']['next'] += 1;

    /* TO-DO: Assign data to matchChampions/matchMaps picked / available */
    @$vetoType = $game['matchSteps']['list'][$i];

    if ($vetoType == 'champ_pick' || $vetoType == 'champ_ban') {
        // Add to "Taken"
        array_push($game['matchChampions']['taken'], $currentMatchStep);

        // Remove from "Available"
        unset($game['matchChampions']['available'][$currentMatchStep]);
    }

    if ($vetoType == 'map_pick' || $vetoType == 'map_ban') {
        // Add to Picked (for map order)
        if ($vetoType == 'map_pick')
            array_push($game['matchMaps']['picked'], $currentMatchStep);

        // Add to "Taken"
        array_push($game['matchMaps']['taken'], $currentMatchStep);

        // Remove from "Available"
        unset($game['matchMaps']['available'][$currentMatchStep]);
    }
}

/*
 *  Fix Champions and Maps
 */
$newArray = [];

// Maps
$oldArray = $game['matchMaps']['available'];
$newArray = [];
foreach($oldArray as $key => $value) {
 array_push($newArray, $key);
}
$game['matchMaps']['available'] = $newArray;

// Champions
$oldArray = $game['matchChampions']['available'];
$newArray = [];
foreach($oldArray as $key => $value) {
 array_push($newArray, $key);
}
$game['matchChampions']['available'] = $newArray;

// Copy Pasta
if (count($game['matchSteps']['list']) == count($game['matchSteps']['values'])) {
    $game['matchCopyPasta'] = "[" . $game['matchPlayerOne'] . "/" . $game['matchPlayerTwo'] . "] -";
    foreach ($game['matchMaps']['picked'] as $key => $value) {
        $game['matchCopyPasta'] .= " [" . $game['matchMaps']['listAbbreviation'][$key] . "] ";

        $enum = "/";
        $MAPS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];
        foreach ($game['matchSteps']['list'] as $k => $v) {

            // Check if Next is greater than step number
            /*
            echo "
            <br/>Key: " . $k . "
            <br/>Next: " . $game['matchSteps']['next'] . "
            <br/>Split Map: " . $game['matchSplitMap' . $MAPS[$key]] . "
            <br/>Next: " . $game['matchSplitMap' . $MAPS[$key+1]] . "
            <br/>Value: " . $v . "<br/>
            ";
            */
            if (
                $k <= $game['matchSteps']['next']
                && $k > $game['matchSplitMap' . $MAPS[$key]]
                && $k <= $game['matchSplitMap' . $MAPS[$key+1]]
            ) {
                if ($v == "champ_pick") {
                    @$game['matchCopyPasta'] .= $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][$k]] . $enum;
                    $enum = "";
                }
            }
        }
    }
}

/*
* JSON
*/
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
echo json_encode($game);
exit;