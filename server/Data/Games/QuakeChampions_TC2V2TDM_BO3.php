<?php

/*
 * matchSplit*** = Length is with 0 counting as 1
 * matchSteps.Next = Length without 0 counting as 1
 */

$game['matchConfig']                = 'Quake Champions TastyCups 2V2 TDM (Best of 3)';
$game['matchSpec']                  = 1;
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
        'champ_ban',
        'champ_ban',
        'map_pick',
        'map_pick',
        'map_ban',
        'map_ban',
        'map_pick',
    ],
    'player' => [
        1,
        0,
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
        'Awoken',
        'Exile',
        'Vale of Pnath',
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
    'listImage' => [
        '/qc/awoken.jpg',
        '/qc/blood_covenant.jpg',
        '/qc/exile.jpg',
        '/qc/corrupted_keep.jpg',
        '/qc/the_molten_falls.jpg',
        '/qc/ruins_of_sarnath.jpg',
        '/qc/blood_run.jpg'
    ],
];
$game['matchChampions'] = [
    'available' => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
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
        'Athena',
        'Deathknight',
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
        'Athena',
        'DK'
    ],
    'listImage' => [
        '/qc/nyx.png',
        '/qc/anarki.png',
        '/qc/slash.png',
        '/qc/visor.png',
        '/qc/ranger.png',
        '/qc/galena.png',
        '/qc/bj.png',
        '/qc/doom.png',
        '/qc/strogg.png',
        '/qc/eisen.png',
        '/qc/scalebearer.png',
        '/qc/clutch.png',
        '/qc/sorlag.png',
        '/qc/keel.png',
        '/qc/athena.png',
        '/qc/deathknight.png',
    ]
];
