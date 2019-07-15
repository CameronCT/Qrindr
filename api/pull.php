<?php session_start(); require('core/autoload.php');

$MAPS_PICKED = [];
$CHAMPIONS_PICKED = [];
$MAPS_BANNED = [];
$CHAMPIONS_BANNED = [];

$MAPS = [
    1 => 'Awoken',
    2 => 'Blood Covenant',
    3 => 'Blood Run',
    4 => 'Corrupted Keep', 
    5 => 'Ruins of Sarnath',
    6 => 'Molten Falls',
    7 => 'Vale of Pnath',
];

$MAPS_AB = [
    1 => 'Awoken',
    2 => 'BC/DM6',
    3 => 'BR/ZTN',
    4 => 'CK', 
    5 => 'Ruins',
    6 => 'Molten',
    7 => 'Vale',
];

$CHAMPIONS = [
    1 => 'Nyx',
    2 => 'Anarki',
    3 => 'Slash',
    4 => 'Visor',
    5 => 'Ranger',
    6 => 'Galena', 
    7 => 'B.J. Blazkowicz',
    8 => 'Doom Slayer',
    9 => 'Strogg & Peeker',
    10 => 'Death Knight',
    11 => 'Eisen',
    12 => 'Scalebearer',
    13 => 'Clutch',
    14 => 'Sorlag',
    15 => 'Keel',
    16 => 'Athena'
];

$CHAMPIONS_AB = [
    1 => 'Nyx',
    2 => 'Anarki',
    3 => 'Slash',
    4 => 'Visor',
    5 => 'Ranger',
    6 => 'Galena', 
    7 => 'BJ',
    8 => 'Doom Slayer',
    9 => 'Strogg',
    10 => 'DK',
    11 => 'Eisen',
    12 => 'Scale',
    13 => 'Clutch',
    14 => 'Sorlag',
    15 => 'Keel',
    16 => 'Athena'
];

arsort($CHAMPIONS);

$err = null;

$pull = $conn->prepare("SELECT * FROM quakechampions WHERE uuid = ?");
$pull->execute(array($_GET['id']));
$data = $pull->fetch(PDO::FETCH_ASSOC);

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
        $MAPS_BANNED[$data['map_ban_' . $i]] = $MAPS[$data['map_ban_' . $i]];
        unset($MAPS[$data['map_ban_' . $i]]);
    }
}

for ($i = 1; $i <= 4; $i++) {
    if ($data['map_pick_' . $i] != 0) {
        $MAPS_PICKED[$data['map_pick_' . $i]] = $MAPS[$data['map_pick_' . $i]];
        unset($MAPS[$data['map_pick_' . $i]]);
    }
}

/* Champions */
for ($i = 1; $i <= 5; $i++) {
    if ($data['champ_ban_' . $i] != 0) {
        $CHAMPIONS_BANNED[$data['champ_ban_' . $i]] = $CHAMPIONS[$data['champ_ban_' . $i]];
        unset($CHAMPIONS[$data['champ_ban_' . $i]]);
    }
}

for ($i = 1; $i <= 10; $i++) {
    if ($data['champ_pick_' . $i] != 0) {
        $CHAMPIONS_PICKED[$data['champ_pick_' . $i]] = $CHAMPIONS[$data['champ_pick_' . $i]];
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
    'champions_ab' => $CHAMPIONS_AB,
    'maps_ab' => $MAPS_AB,
    'champions_picked' => $CHAMPIONS_PICKED,
    'champions_banned' => $CHAMPIONS_BANNED,
    'maps_picked' => $MAPS_PICKED,
    'maps_banned' => $MAPS_BANNED
]);
exit;
?>