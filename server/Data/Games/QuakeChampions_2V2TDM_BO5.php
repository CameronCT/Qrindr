<?php

/*
 * matchSplit*** = Length is with 0 counting as 1
 * matchSteps.Next = Length without 0 counting as 1
 */

$game['matchConfig']                = 'Quake Champions 2V2 TDM (Best of 5)';
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
        'map_pick',
        'map_pick',
        'map_pick',
        'map_pick',
        'map_pick',
        'champ_ban',
        'champ_ban',
    ],
    'player' => [
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1
    ],
    'values' => []
];
$game['matchMaps'] = [
    'available' => [0, 1, 2, 3, 4, 5, 6],
    'taken' => [],
    'picked' => [],
    'list' => [
        'Awoken',
        'Blood Covenant',
        'Exile',
        'Corrupted Keep',
        'Molten Falls',
        'Ruins of Sarnath',
        'Blood Run'
    ],
    'listAbbreviation' => [
        'Awoken',
        'BC/DM6',
        'Exile',
        'CK',
        'Molten',
        'Ruins',
        'ZTN'
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