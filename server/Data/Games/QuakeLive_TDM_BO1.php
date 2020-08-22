<?php

/*
 * matchSplit*** = Length is with 0 counting as 1
 * matchSteps.Next = Length without 0 counting as 1
 */

$game['matchConfig']                = 'Quake Live TDM (Best of 1)';
$game['matchSplitMapOne']           = 999;
$game['matchSplitMapTwo']           = 999;
$game['matchSplitMapThree']         = 999;
$game['matchSplitMapFour']          = 999;
$game['matchSplitMapFive']          = 999;
$game['matchSplitMapSix']           = 999;
$game['matchSplitMapSeven']         = 999;
$game['matchTimeout']               = 30;
$game['matchSteps']                 = [
    'next' => 0,
    'list' => [
          'map_ban',
          'map_ban',
          'map_ban',
          'map_ban',
          'map_pick',
    ],
    'player' => [
        0,
        1,
        0,
        1,
        0
    ],
    'values' => []
];
$game['matchMaps'] = [
    'available' => [0, 1, 2, 3, 4],
    'taken' => [],
    'picked' => [],
    'list' => [
        'Ragnarok',
        'Hidden Fortress',
        'Limbus',
        'Purgatory',
        'Dreadful Place',
    ],
    'listAbbreviation' => [
        'Ragnarok',
        'Hidden Fortress',
        'Limbus',
        'Purgatory',
        'Dreadful Place',
    ],
    'listImage' => [],
];
$game['matchChampions'] = [
    'available' => [],
    'taken' => [],
    'list' => [],
    'listAbbreviation' => [],
    'listImage' => [],
];