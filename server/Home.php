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
$data['Matches'] = $conn->getMatches(18);
$count = count($data['Matches']);
for ($i = 0; $i < $count; $i++) {
    $data['Matches'][$i]['matchConfig'] = $games[$data['Matches'][$i]['matchConfig']]['configName'];
}

// Statistics
$data['Statistics'] = [
    'totalMatches' => (13019 + $conn->countMatches())
];

// GitHub
$github = json_decode(curl_get_content('https://api.github.com/repos/CameronCT/Qrindr/commits/master'), true);
$data['GitHub'] = [
    'URL' => $github['html_url'],
    'SHA' => $github['sha'],
    'MSG' => $github['commit']['message'],
    'DATE' => date("F d, Y", strtotime($github['commit']['committer']['date']))
];

header('Content-Type: application/json');
echo json_encode($data, true);
exit;