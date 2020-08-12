<?php

/*
 * matchSplit*** = Length is with 0 counting as 1
 * matchSteps.Next = Length without 0 counting as 1
 */

$game['matchConfig']                = 'Quake Champions - Timelimit Duel (Best of 3)';
$game['matchSplitMapOne']           = 4;
$game['matchSplitMapTwo']           = 7;
$game['matchSplitMapThree']         = 10;
$game['matchSplitMapFour']          = 999;
$game['matchSplitMapFive']          = 999;
$game['matchSplitMapSix']           = 999;
$game['matchSplitMapSeven']         = 999;
$game['matchTimeout']               = 30;
$game['matchSteps']                 = [
    'next' => 0,
    'list' => [
          'map_pick',
          'map_pick',
          'map_ban',
          'map_ban',
          'map_pick',
          'champ_ban',
          'champ_pick',
          'champ_pick',
          'champ_ban',
          'champ_pick',
          'champ_pick',
          'champ_ban',
          'champ_pick',
          'champ_pick'
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
        'Blood Run',
        'Corrupted Keep',
        'Molten Falls',
        'Ruins of Sarnath',
        'Vale of Pnath'
    ],
    'listAbbreviation' => [
        'Awoken',
        'BC/DM6',
        'BR/ZTN',
        'CK',
        'Molten',
        'Ruins',
        'Vale'
    ]
];
$game['matchChampions'] = [
    'available' => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
    'taken' => [],
    'list' => [
        'Nyx',
        'Anarki',
        'Slash',
        'Visor',
        'Ranger',
        'Galena',
        'B.J. Blazkowicz',
        'Doom Slayer',
        'Strogg & Peeker',
        'Eisen',
        'Scalebearer',
        'Clutch',
        'Sorlag',
        'Keel',
        'Athena'
    ],
    'listAbbreviation' => [
        'Nyx',
        'Anarki',
        'Slash',
        'Visor',
        'Ranger',
        'Galena',
        'BJ',
        'Doom',
        'Strogg',
        'Eisen',
        'Scalebearer',
        'Clutch',
        'Sorlag',
        'Keel',
        'Athena'
    ]
];