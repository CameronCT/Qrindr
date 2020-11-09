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
$data['Matches'] = $conn->getMatches(30);
$count = count($data['Matches']);
for ($i = 0; $i < $count; $i++) {
    $gamesLength = count($games);
    for ($j = 0; $j < $gamesLength; $j++)
        if ($data['Matches'][$i]['matchConfig'] == $games[$j]['configId'])
            $data['Matches'][$i]['matchConfig'] = $games[$j]['configName'];
}

// Statistics
$data['Statistics'] = [
    'totalMatches' => number_format((13019 + $conn->countMatches()))
];

// GitHub
$github = json_decode(curl_get_content('https://api.github.com/repos/CameronCT/Qrindr/commits/master'), true);
if ($github && isset($github['html_url'])) {
    $data['GitHub'] = [
        'URL' => $github['html_url'],
        'SHA' => $github['sha'],
        'MSG' => $github['commit']['message'],
        'DATE' => date("F d, Y", strtotime($github['commit']['committer']['date']))
    ];
}

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Max-Age: 1000");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");
header("Access-Control-Allow-Methods: PUT, POST, GET, OPTIONS, DELETE");
echo json_encode($data, true);
exit;