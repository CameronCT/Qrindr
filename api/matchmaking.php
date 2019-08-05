<?php session_start(); require('core/autoload.php'); if (isset($_POST)) $_POST = json_decode(file_get_contents('php://input'),true);

$err = null;
$msg = null;
$redirect = null;
$stats = null;
$prefix = "[G]";
$qcapi = "https://stats.quake.com/api/v2/Player/Stats?name=";

$NAMES[1] = [
    'Dog', 'Cat', 'Mouse', 'Mice', 'Rabbit', 'Kangaroo', 'Horse', 'Lion', 'Pig', 'Rapha', 'Hamster', 'Guinea', 'Giraffe', 'Lamb'
];

$NAMES[2] = [
    'Comeback', 'Gatekeeper', 'Accountant', 'Unknown', 'Napoleon', 'Lightning', 'Enigma', 'Professor', 'Raw', 'Whazzle', 'Dazzle', 'Prince', 'Karate', 'King', 'Bulldog', 'Cheetah', 'God', 'Lights', 'Terminator', 'Kid', 'Handler'
];

$NAMES[3] = [
    'Wall', 'House', 'Ceiling', 'Tile', 'Drywall', 'Cocking', 'Chip', 'Pizza', 'Sauce', 'Dream'
];

function searchQueue($conn, $queueName, $queueRegion) {
    /* Search for Available Players */
    $searchQueue = $conn->prepare("
        SELECT 
            m_id, m_name, m_alias, m_updated FROM quakechampions_matchmaking 
        WHERE 
            m_name != ? AND m_region = ? AND m_skillrating < (m_skillrating + 100) AND m_skillrating > (m_skillrating - 400)
        ORDER BY m_id DESC
        LIMIT 1
    ");
    $searchQueue->execute(array($queueName, $queueRegion));
    $useMatch = $searchQueue->fetch(PDO::FETCH_ASSOC);

    /* Check if Match Exists */
    $matchExists = $conn->prepare("SELECT COUNT(g_id) FROM quakechampions_grindr WHERE g_player1 = ? AND g_player2 = ? OR g_player1 = ? AND g_player2 = ?");
    $matchExists->execute(array($_SESSION['queueName'], $useMatch['m_name'], $useMatch['m_name'], $_SESSION['queueName']));

    if ($matchExists->fetchColumn() > 0)
        return $useMatch;
    else
        searchQueue($conn, $queueName, $queueRegion);
}

if (isset($_GET['stats'])) {

    $countQueue = $conn->query("SELECT COUNT(m_id) FROM quakechampions_matchmaking");
    $stats['count'] = $countQueue->fetchColumn();

}

if (isset($_GET['update'])) {

    /* Remove everyone that's been inactive for more than 5 minutes */
    $getQueue = $conn->query("SELECT m_id, m_name, m_updated, m_datetime FROM quakechampions_matchmaking");
    foreach ($getQueue->fetchAll(PDO::FETCH_ASSOC) as $v) {
        if ( ($v['m_updated'] - 60) > time())
            $removeQueue = $conn->query("DELETE FROM quakechampions_matchmaking WHERE (m_updated - 5) > NOW()");
    }
    
    /* if Player is inQueue == true */
    if (isset($_SESSION['inQueue']) && $_SESSION['inQueue'] == true) {

        /* Update Queue Timers if player is active */
        $updateQueue = $conn->prepare("UPDATE quakechampions_matchmaking SET m_updated = ? WHERE m_name = ?");
        $updateQueue->execute(array(time(), $_SESSION['queueName']));

        /* Search for Available Players */
        $getPossibleMatch = searchQueue($conn, $_SESSION['queueName'], $_SESSION['queueRegion']);

        /* Start the Process of Creating a Match */
        $queueAndMatch = $conn->prepare("
            INSERT INTO 
                quakechampions_grindr
            ( g_player1, g_player2 )
                VALUES
            ( ?, ? )
        ");
        $queueAndMatch->execute(array($_SESSION['queueName'], $getPossibleMatch['m_name']));

        /* if Match Exists */
        $findMatch = $conn->prepare("SELECT COUNT(g_id) AS rowCount, g_player1, g_player2 FROM quakechampions_grindr WHERE g_player1 = ? OR  g_player2 = ?");
        $findMatch->execute(array($_SESSION['queueName'], $_SESSION['queueName']));
        $findMatched = $findMatch->fetch(PDO::FETCH_ASSOC);

        if ($findMatched['rowCount'] > 0) {
            $getMatchURL = $conn->prepare("SELECT m_uuid, m_passphrase FROM quakechampions WHERE player1 = ? AND player2 = ? OR player1 = ? AND player2 = ?");
            $getMatchURL->execute(array($findMatched['g_player1'], $findMatched['g_player2'], $findMatched['g_player2'], $findMatched['g_player1']));
            $getMatchedURL = $getMatchURL->fetch(PDO::FETCH_ASSOC);

            // Create Match URL
            $redirect = $getMatchedURL['m_uuid'] . '/' . md5($getMatchedURL['m_passphrase']) . '/' . $_SESSION['queueName'];

            // Reset Queue Stats
            unset($_SESSION['queueName']);
            unset($_SESSION['queueRegion']);
            unset($_SESSION['inQueue']);
        }

    }

} 

if (isset($_POST['remove'])) {

    if (isset($_SESSION['queueName']) && $_SESSION['queueRegion']) {
        $removeName = $conn->prepare("DELETE FROM quakechampions_matchmaking WHERE m_name = ? AND m_region = ?");
        $removeName->execute(array($_SESSION['queueName'], $_SESSION['queueRegion']));

        if ($removeName->rowCount() > 0) {
            unset($_SESSION['queueName']);
            unset($_SESSION['queueRegion']);
            unset($_SESSION['inQueue']);

            $msg = "You have successfully been removed from the queue!";
        }
    }

}

if (isset($_POST['add']) && isset($_POST['region'])) {

    $_POST['add'] = filter_var($_POST['add'], FILTER_SANITIZE_STRING);

    /* Check if Name Exists */
    if (isset($_SESSION['inQueue']) && $_SESSION['inQueue'] == true) {
        $checkName = $conn->prepare("SELECT COUNT(m_id) FROM quakechampions_matchmaking WHERE m_name = ?");
        $checkName->execute(array($_POST['add']));
        if ($checkName->fetchColumn() > 0) $err = "This name is already in queue!";
    }

    /* Check if QC Name Exists */
    $apiurl = @file_get_contents($qcapi . urlencode($_POST['add']));
    if ($apiurl === false)
        $err = "Invalid name!";
    else {
        $res = json_decode($apiurl, true);
        if (!empty($res) && isset($res['code']) && $res['code'] == 404)
            $err = "Invalid name!";
    }

    /* Check if Region is correctly */
    if (!in_array($_POST['region'], ['NA', 'EU', 'OCE'])) $err = "Invalid region!";

    if (!$err || $err == null) {

        $alias = $NAMES[1][rand(0, count($NAMES[1]) - 1)] . $NAMES[2][rand(0, count($NAMES[2]) - 1)] . $NAMES[3][rand(0, count($NAMES[3]) - 1)];

        /* Add Name to Queue */
        $addName = $conn->prepare("INSERT INTO quakechampions_matchmaking ( m_name, m_alias, m_region, m_skillrating ) VALUES ( ?, ?, ?, ? )");
        $addName->execute(array($_POST['add'], $alias, $_POST['region'], ($res['playerRatings']['duel']['rating'] + $res['playerRatings']['duel']['deviation'])));

        if ($addName->rowCount() > 0) {
            $_COOKIE['savedName'] = $_POST['add'];
            $_SESSION['inQueue'] = true;
            $_SESSION['queueName'] = $_POST['add'];
            $_SESSION['queueRegion'] = $_POST['region'];

            $msg = "You have succcessfully been added to the queue!";
        }
    }
}

/* JSON */
header('Content-Type: application/json');
echo json_encode(['error' => $err, 'success' => $msg, 'redirect' => $redirect, 'stats' => $stats]);
exit;

?>