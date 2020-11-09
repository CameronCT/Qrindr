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
$gamesLength = count($games);
for ($i = 0; $i < $gamesLength; $i++) {
    if ($games[$i]['configId'] == $matchData['matchConfig'])
        require_once('Data/Games/' . $games[$i]['configFile'] . '.php');
}

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
    $game['matchCopyPasta'] = "[" . $game['matchPlayerTwo'] . "/" . $game['matchPlayerOne'] . "] -";
    foreach ($game['matchMaps']['picked'] as $key => $value) {
        $game['matchCopyPasta'] .= " [" . $game['matchMaps']['listAbbreviation'][$value] . "] ";

        $enum = "/";
        $MAPS = ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'];

        $copyPastaQuake = ['QuakeChampions_TimelimitDuel_BO3', 'QuakeChampions_TimelimitDuel_BO5', 'QuakeChampions_2V2TDM_BO3', 'QuakeChampions_2V2TDM_BO5'];
        if (in_array($games[$matchData['matchConfig']]['configFile'], $copyPastaQuake)) {

            if ($game['matchSplitMap' . $MAPS[$key]] != 999) {

                if ($MAPS[$key] == 'One')
                    @$game['matchCopyPasta'] .= $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][8]] . '/' . $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][9]];

                if ($MAPS[$key] == 'Two')
                    @$game['matchCopyPasta'] .= $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][12]] . '/' . $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][11]];

                if ($MAPS[$key] == 'Three')
                    @$game['matchCopyPasta'] .= $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][14]] . '/' . $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][15]];

                if ($MAPS[$key] == 'Four')
                    @$game['matchCopyPasta'] .= $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][18]] . '/' . $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][17]];

                if ($MAPS[$key] == 'Five')
                    @$game['matchCopyPasta'] .= $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][20]] . '/' . $game['matchChampions']['listAbbreviation'][$game['matchSteps']['values'][21]];

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