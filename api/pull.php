<?php session_start(); require('core/autoload.php');

$MAPS_VETO          = [];
$CHAMPIONS_VETO     = [];

$MAPS = [
    1 => [
        'ID'            => 1,
        'Name'          => 'Awoken',
        'Abbreviation'  => 'Awoken'
    ],
    2 => [
        'ID'            => 2,
        'Name'          => 'Blood Covenant',
        'Abbreviation'  => 'BC/DM6'
    ],
    3 => [
        'ID'            => 3,
        'Name'          => 'Blood Run',
        'Abbreviation'  => 'BR/ZTN'
    ],
    4 => [
        'ID'            => 4,
        'Name'          => 'Corrupted Keep',
        'Abbreviation'  => 'CK'
    ],
    5 => [
        'ID'            => 5,
        'Name'          => 'Ruins of Sarnath',
        'Abbreviation'  => 'Ruins'
    ],
    6 => [
        'ID'            => 6,
        'Name'          => 'Molten Falls',
        'Abbreviation'  => 'Molten'
    ],
    7 => [
        'ID'            => 7,
        'Name'          => 'Vale of Pnath',
        'Abbreviation'  => 'Vale'
    ],
];

$CHAMPIONS = [
    1 => [
        'ID'            => 1,
        'Name'          => 'Nyx',
        'Abbreviation'  => 'Nyx',
    ],
    2 => [
        'ID'            => 2,
        'Name'          => 'Anarki',
        'Abbreviation'  => 'Anarki',
    ],
    3 => [
        'ID'            => 3,
        'Name'          => 'Slash',
        'Abbreviation'  => 'Slash',
    ],
    4 => [
        'ID'            => 4,
        'Name'          => 'Visor',
        'Abbreviation'  => 'Visor',
    ],
    5 => [
        'ID'            => 5,
        'Name'          => 'Ranger',
        'Abbreviation'  => 'Ranger',
    ],
    6 => [
        'ID'            => 6,
        'Name'          => 'Galena',
        'Abbreviation'  => 'Galena',
    ],
    7 => [
        'ID'            => 7,
        'Name'          => 'B.J. Blazkowicz',
        'Abbreviation'  => 'BJ Blazk',
    ],
    8 => [
        'ID'            => 8,
        'Name'          => 'Doom Slayer',
        'Abbreviation'  => 'Doom',
    ],
    9 => [
        'ID'            => 9,
        'Name'          => 'Strogg & Peeker',
        'Abbreviation'  => 'Strogg',
    ],
    10 => [
        'ID'            => 10,
        'Name'          => 'Death Knight',
        'Abbreviation'  => 'DK',
    ],
    11 => [
        'ID'            => 11,
        'Name'          => 'Eisen',
        'Abbreviation'  => 'Eisen',
    ],
    12 => [
        'ID'            => 12,
        'Name'          => 'Scalebearer',
        'Abbreviation'  => 'Scalebearer',
    ],
    13 => [
        'ID'            => 13,
        'Name'          => 'Clutch',
        'Abbreviation'  => 'Clutch',
    ],
    14 => [
        'ID'            => 14,
        'Name'          => 'Sorlag',
        'Abbreviation'  => 'Sorlag',
    ],
    15 => [
        'ID'            => 15,
        'Name'          => 'Keel',
        'Abbreviation'  => 'Keel',
    ],
    16 => [
        'ID'            => 16,
        'Name'          => 'Athena',
        'Abbreviation'   => 'Athena',
    ],
];

arsort($CHAMPIONS);

$err = null;

$pull = $conn->prepare("SELECT * FROM quakechampions WHERE uuid = ?");
$pull->execute(array($_GET['id']));
$data = $pull->fetch(PDO::FETCH_ASSOC);

$data['map_pick_5'] = 0;

if (empty($data))
    $err = "Invalid match!";

if (isset($_GET['pwd']) && isset($_GET['player'])) {
    if ($_GET['pwd'] != $data['password'])
        $err = "Invalid password!";
    
    if ($_GET['player'] != $data['player1'] && $_GET['player'] != $data['player2'])
        $err = "Invalid player!";

}
/* ---- Process Data ---- */

/* Maps */
for ($i = 1; $i <= 4; $i++) {
    if ($data['map_ban_' . $i] != 0) {
        $MAPS_VETO['Ban'][$data['map_ban_' . $i]] = $MAPS[$data['map_ban_' . $i]];
        unset($MAPS[$data['map_ban_' . $i]]);
    }
}

for ($i = 1; $i <= 4; $i++) {
    if ($data['map_pick_' . $i] != 0) {
        $MAPS_VETO['Pick'][$data['map_pick_' . $i]] = $MAPS[$data['map_pick_' . $i]];
        unset($MAPS[$data['map_pick_' . $i]]);
    }
}

/* Map Tiebreaker */
if (count($MAPS) == 1) {
    if ($data['bestof'] == 3)
        $data['map_pick_3'] = end($MAPS)['ID'];

    if ($data['bestof'] == 5)
        $data['map_pick_5'] = end($MAPS)['ID'];
    
    $MAPS_VETO['Pick'][end($MAPS)['ID']] = $MAPS[end($MAPS)['ID']];
    unset($MAPS[end($MAPS)['ID']]);
}

/* Champions */
for ($i = 1; $i <= 5; $i++) {
    if ($data['champ_ban_' . $i] != 0) {
        $CHAMPIONS_VETO['Ban'][$data['champ_ban_' . $i]] = $CHAMPIONS[$data['champ_ban_' . $i]];
        unset($CHAMPIONS[$data['champ_ban_' . $i]]);
    }
}

for ($i = 1; $i <= 10; $i++) {
    if ($data['champ_pick_' . $i] != 0) {
        $CHAMPIONS_VETO['Pick'][$data['champ_pick_' . $i]] = $CHAMPIONS[$data['champ_pick_' . $i]];
        unset($CHAMPIONS[$data['champ_pick_' . $i]]);
    }
}

/* JSON */
header('Content-Type: application/json');
echo json_encode([
    'error'     => $err,
    'data'   => $data,
    'champions' => $CHAMPIONS,
    'maps' => $MAPS,
    'champions_veto' => $CHAMPIONS_VETO,
    'maps_veto' => $MAPS_VETO,
]);
exit;
?>