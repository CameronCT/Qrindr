<?php

$games[] = [
    'configId'   => 0,
    'configName' => 'Quake Champions - Timelimit Duel (QPL S2:S1 - Best of 3)',
    'configFile' => 'QuakeChampions_TimelimitDuel_QPL_S2S1_BO3',
    'order'      => 2,
];

$games[] = [
    'configId'   => 1,
    'configName' => 'Quake Champions - Timelimit Duel (QPL S2:S1 - Best of 5)',
    'configFile' => 'QuakeChampions_TimelimitDuel_QPL_S2S1_BO5',
    'order'      => 3,
];

$games[] = [
    'configId'   => 2,
    'configName' => 'Quake Champions - 2V2 TDM (Best of 3)',
    'configFile' => 'QuakeChampions_2V2TDM_BO3',
    'order'      => 4,
];

$games[] = [
    'configId'   => 3,
    'configName' => 'Quake Champions - 2V2 TDM (Best of 5)',
    'configFile' => 'QuakeChampions_2V2TDM_BO5',
    'order'      => 5,
];

$games[] = [
    'configId'   => 17,
    'configName' => 'Quake Champions - Timelimit Duel (QPL S2:S2 - Best of 3)',
    'configFile' => 'QuakeChampions_TimelimitDuel_QPL_S2S2_BO3',
    'order'      => 0,
];

$games[] = [
    'configId'   => 18,
    'configName' => 'Quake Champions - Timelimit Duel (QPL S2:S2 - Best of 5)',
    'configFile' => 'QuakeChampions_TimelimitDuel_QPL_S2S2_BO5',
    'order'      => 1,
];

$games[] = [
    'configId'   => 4,
    'configName' => 'Diabotical - Esports Duel (Best of 3)',
    'configFile' => 'Diabotical_Duel_BO3',
    'order'      => 11,
];
$games[] = [
    'configId'   => 5,
    'configName' => 'Diabotical - Esports Duel (Best of 5)',
    'configFile' => 'Diabotical_Duel_BO5',
    'order'      => 12,
];

$games[] = [
    'configId'   => 14,
    'configName' => 'CS:GO - Active Pool (Best of 1)',
    'configFile' => 'CSGO_Comp_BO1',
    'order'      => 20,
];

$games[] = [
    'configId'   => 15,
    'configName' => 'CS:GO - Active Pool (Best of 3)',
    'configFile' => 'CSGO_Comp_BO3',
    'order'      => 21,
];

$games[] = [
    'configId'   => 16,
    'configName' => 'CS:GO - Active Pool (Best of 5)',
    'configFile' => 'CSGO_Comp_BO5',
    'order'      => 22,
];

$games[] = [
    'configId'   => 6,
    'configName' => 'Quake Live Duel (Best of 3)',
    'configFile' => 'QuakeLive_Duel_BO3',
    'order'      => 60,
];
$games[] = [
    'configId'   => 7,
    'configName' => 'Quake Live Duel (Best of 5)',
    'configFile' => 'QuakeLive_Duel_BO5',
    'order'      => 60,
];

$games[] = [
    'configId'   => 8,
    'configName' => 'Quake Live CTF (Best of 1)',
    'configFile' => 'QuakeLive_CTF_BO1',
    'order'      => 70,
];

$games[] = [
    'configId'   => 9,
    'configName' => 'Quake Live CTF (Best of 3)',
    'configFile' => 'QuakeLive_CTF_BO3',
    'order'      => 80,
];
$games[] = [
    'configId'   => 10,
    'configName' => 'Quake Live CTF (Best of 5)',
    'configFile' => 'QuakeLive_CTF_BO5',
    'order'      => 90
];

$games[] = [
    'configId'   => 11,
    'configName' => 'Quake Live TDM (Best of 1)',
    'configFile' => 'QuakeLive_TDM_BO1',
    'order'      => 100
];

$games[] = [
    'configId'   => 12,
    'configName' => 'Quake Live TDM (Best of 3)',
    'configFile' => 'QuakeLive_TDM_BO3',
    'order'      => 110
];

$games[] = [
    'configId'   => 13,
    'configName' => 'Quake Live TDM (Best of 5)',
    'configFile' => 'QuakeLive_TDM_BO5',
    'order'      => 120
];

usort($games, function($a, $b) {
    return $a['order'] <=> $b['order'];
});