<?php

/*
 * matchSplit*** = Length is with 0 counting as 1
 * matchSteps.Next = Length without 0 counting as 1
 */

$game['matchConfig']                = 'Quake Champions - Timelimit Duel (Season 3, Stage 1 - Best of 5)';
$game['matchSplitMapOne']           = 6;
$game['matchSplitMapTwo']           = 9;
$game['matchSplitMapThree']         = 12;
$game['matchSplitMapFour']          = 15;
$game['matchSplitMapFive']          = 18;
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
        'champ_pick',
        'champ_pick',
        'champ_ban',
        'champ_pick',
        'champ_pick',
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
    'player' => [
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0,
        1,
        0
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
        'Corrupted Keep',
        'Deep Embrace',
        'Insomnia',
        'Ruins of Sarnath',
        'Vale of Pnath'
    ],
    'listAbbreviation' => [
        'Awoken',
        'BC',
        'CK',
        'DE',
        'IN',
        'Ruins',
        'Vale'
    ],
    'listImage' => [
        'https://stats.quake.com/maps/awoken.jpg',
        'https://stats.quake.com/maps/exile.jpg',
        'https://stats.quake.com/maps/blood_run.jpg',
        'https://stats.quake.com/maps/corrupted_keep.jpg',
        'https://stats.quake.com/maps/the_molten_falls.jpg',
        'https://stats.quake.com/maps/ruins_of_sarnath.jpg',
        'https://stats.quake.com/maps/vale_of_pnath.jpg'
    ]
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
    ]
];