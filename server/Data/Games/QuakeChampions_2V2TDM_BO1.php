<?php

/*
 * matchSplit*** = Length is with 0 counting as 1
 * matchSteps.Next = Length without 0 counting as 1
 */

$game['matchConfig']                = 'Quake Champions 2V2 TDM (Best of 1)';
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
          'map_ban',
          'map_ban',
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
        'https://stats.quake.com/champions/nyx.png',
        'https://stats.quake.com/champions/anarki.png',
        'https://stats.quake.com/champions/slash.png',
        'https://stats.quake.com/champions/visor.png',
        'https://stats.quake.com/champions/ranger.png',
        'https://stats.quake.com/champions/galena.png',
        'https://stats.quake.com/champions/bj.png',
        'https://stats.quake.com/champions/doom.png',
        'https://stats.quake.com/champions/strogg.png',
        'https://stats.quake.com/champions/eisen.png',
        'https://stats.quake.com/champions/scalebearer.png',
        'https://stats.quake.com/champions/clutch.png',
        'https://stats.quake.com/champions/sorlag.png',
        'https://stats.quake.com/champions/keel.png',
        'https://stats.quake.com/champions/athena.png',
        'https://stats.quake.com/champions/deathknight.png',
    ]
];
