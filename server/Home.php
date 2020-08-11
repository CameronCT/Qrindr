<?php require_once('Core/Autoload.php');

$data = [];

// Blogs
$data['Blogs'] = $conn->getBlogs(5);

// Games
require_once($baseDir . '/Data/Games.php');
$data['Configs'] = $games;

// Cointoss
require_once($baseDir . '/Data/Options/Cointoss.php');
$data['Cointoss'] = $cointoss;

// Recent Matches
$data['Matches'] = $conn->getMatches(25);
$count = count($data['Matches']);
for ($i = 0; $i < $count; $i++) {
    $data['Matches'][$i]['matchConfig'] = $games[$data['Matches'][$i]['matchConfig']]['configName'];
}

// Statistics
$data['Statistics'] = [
    'totalMatches' => (13019 + $conn->countMatches())
];

header('Content-Type: application/json');
echo json_encode($data, true);
exit;