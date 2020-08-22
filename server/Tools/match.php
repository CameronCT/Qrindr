<?php

$data = [];

$data['matchId'] = 0;
$data['matchConfig'] = "Quake Champions - Timelimit Duel (Best of 3)";
$data['matchPlayerOne'] = "GNiK";
$data['matchPlayerTwo'] = "DaHanG";
$data['matchCointoss'] = 0;
$data['matchSplit'] = 6;

for ($i = 0; $i < 6; $i++) {
    if ($i <= 1)
        $data['matchSteps'][$i] = "map_pick";
    else
        $data['matchSteps'][$i] = "map_ban";
}

header('Content-Type: application/json');
echo json_encode($data);
exit;