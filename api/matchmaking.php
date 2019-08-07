<?php session_start(); require('core/autoload.php'); if (isset($_POST)) $_POST = json_decode(file_get_contents('php://input'),true);

$err = null;
$msg = null;
$redirect = null;
$stats = null;
$queue = 0;
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
    $getSkillrating = $conn->prepare("SELECT m_skillrating FROM quakechampions_matchmaking WHERE m_name = ? AND m_region = ?");
    $getSkillrating->execute(array($queueName, $queueRegion));
    $sessionRating = (int) $getSkillrating->fetchColumn();

    $searchQueue = $conn->prepare("
        SELECT 
            m_id, m_name, m_alias, m_updated FROM quakechampions_matchmaking 
        WHERE 
            m_name != ? AND m_region = ? AND m_skillrating < ? AND m_skillrating > ?
        ORDER BY m_id DESC
        LIMIT 1
    ");
    $searchQueue->execute(array($queueName, $queueRegion, ($sessionRating + 100), ($sessionRating - 300) ));
    $useMatch = $searchQueue->fetch(PDO::FETCH_ASSOC);

    /* Check if Match Exists */
    $matchExists = $conn->prepare("SELECT COUNT(g_id) FROM quakechampions_grindr WHERE g_player1 = ? AND g_player2 = ? OR g_player1 = ? AND g_player2 = ?");
    $matchExists->execute(array($queueName, $useMatch['m_name'], $useMatch['m_name'], $queueName));

    /* Make Sure Opponent Doesn't Have a Match */
    $opponentMatchExists = $conn->prepare("SELECT COUNT(g_id) AS rowCount FROM quakechampions_grindr WHERE g_player1 = ? OR g_player2 = ?");
    $opponentMatchExists->execute(array($useMatch['m_name'], $useMatch['m_name']));

    if ($matchExists->fetchColumn() == 0 && $opponentMatchExists->fetchColumn() == 0)
        return $useMatch;
    
    return false;
}

if (isset($_GET['stats'])) {

    $countQueue = $conn->query("SELECT COUNT(m_id) FROM quakechampions_matchmaking");
    $stats['count'] = $countQueue->fetchColumn();

}

if (isset($_GET['update'])) {

    /* Remove Queue after 15 seconds */
    $removeQueueSelect = $conn->query("SELECT m_id, m_updated FROM quakechampions_matchmaking");
    foreach ($removeQueueSelect->fetchAll(PDO::FETCH_ASSOC) as $value) {
        
        if ($value['m_updated'] < (time() - 15)) {
            $remove = $conn->prepare("DELETE FROM quakechampions_matchmaking WHERE m_id = ?");
            $remove->execute(array($value['m_id']));
        }
    }

    /* Remove Queue Grindrs after 30 seconds */
    $removeGrindrSelect = $conn->query("SELECT g_id, g_datetime FROM quakechampions_grindr");
    foreach ($removeGrindrSelect->fetchAll(PDO::FETCH_ASSOC) as $value) {
        if ( time() - (strtotime($value['g_datetime'])) > 30) {
            $remove = $conn->prepare("DELETE FROM quakechampions_grindr WHERE g_id = ?");
            $remove->execute(array($value['g_id']));
        }
    } 
    
    /* if Player is inQueue == true */
    if (isset($_SESSION['inQueue']) && $_SESSION['inQueue'] == true) {

        /* Checks if Player's Session is in Queue, but was Removed */
        $checkQueue = $conn->prepare("SELECT COUNT(m_id) FROM quakechampions_matchmaking WHERE m_name = ? AND m_region = ?");
        $checkQueue->execute(array($_SESSION['queueName'], $_SESSION['queueRegion']));

        if ($checkQueue->fetchColumn() == 0) {
            /* Unset Session Variables */
            unset($_SESSION['queueName']);
            unset($_SESSION['queueRegion']);
            unset($_SESSION['inQueue']);
        }    

        /* get Queue Timer */
        $getQueueTime = $conn->prepare("SELECT UNIX_TIMESTAMP(m_datetime) FROM quakechampions_matchmaking WHERE m_name = ? AND m_region = ?");
        $getQueueTime->execute(array($_SESSION['queueName'], $_SESSION['queueRegion']));
        if ($fetchQueueTime = $getQueueTime->fetchColumn())
            $queue = (time() - $fetchQueueTime);

        /* Update Queue Timers if player is active */
        $updateQueue = $conn->prepare("UPDATE quakechampions_matchmaking SET m_updated = ? WHERE m_name = ? AND m_region = ?");
        $updateQueue->execute(array(time(), $_SESSION['queueName'], $_SESSION['queueRegion']));

        /* if Match Exists */
        $findMatch = $conn->prepare("SELECT COUNT(g_id) AS rowCount, g_player1, g_player2, g_serial FROM quakechampions_grindr WHERE g_player1 = ? OR g_player2 = ?");
        $findMatch->execute(array($_SESSION['queueName'], $_SESSION['queueName']));
        $findMatched = $findMatch->fetch(PDO::FETCH_ASSOC);

        if ($findMatched['rowCount'] == 1) {

            $getMatchURL = $conn->prepare("SELECT uuid, `password` FROM quakechampions WHERE uuid = ? AND player1 = ? AND player2 = ? OR uuid = ? AND player1 = ? AND player2 = ?");
            $getMatchURL->execute(array(md5($findMatched['g_serial']), $findMatched['g_player1'], $findMatched['g_player2'], md5($findMatched['g_serial']), $findMatched['g_player2'], $findMatched['g_player1']));
            $getMatchedURL = $getMatchURL->fetch(PDO::FETCH_ASSOC);

            // Check if a Match has been found && Create Match URL
            if ($getMatchedURL['uuid']) {
                $redirect = $getMatchedURL['uuid'] . '/' . $getMatchedURL['password'] . '/' . $_SESSION['queueName'];
                $msg = "A new match has been found! (" . filter_var($findMatched['g_player1'], FILTER_SANITIZE_STRING) . " vs " . filter_var($findMatched['g_player2'], FILTER_SANITIZE_STRING) . ")";

                /* Unset Session Variables */
                unset($_SESSION['queueName']);
                unset($_SESSION['queueRegion']);
                unset($_SESSION['inQueue']);
                
            }
        } elseif ($findMatched['rowCount'] == 0) { 

            /* Search for Available Players */
            $getPossibleMatch = searchQueue($conn, $_SESSION['queueName'], $_SESSION['queueRegion']);

            if ($getPossibleMatch != false) {
                /* Start the Process of Creating a Match */
                $serial = rand(1, 999999);

                $queueAndMatch = $conn->prepare("
                    INSERT INTO 
                        quakechampions_grindr
                    ( g_player1, g_player2, g_serial )
                        VALUES
                    ( ?, ?, ? );

                    INSERT INTO
                        quakechampions
                    ( uuid, player1, player2, bestof, password )
                        VALUES
                    ( ?, ?, ?, ?, ? );
                ");
                $queueAndMatch->execute(array($_SESSION['queueName'], $getPossibleMatch['m_name'], $serial, md5($serial), $_SESSION['queueName'], $getPossibleMatch['m_name'], 3, md5(rand(1, 999999)) ));
            } 
        }
    } 

} 

if (isset($_POST['remove'])) {

    if (isset($_SESSION['queueName']) && isset($_SESSION['queueRegion'])) {
        $removeName = $conn->prepare("DELETE FROM quakechampions_matchmaking WHERE m_name = ? AND m_region = ?");
        $removeName->execute(array($_SESSION['queueName'], $_SESSION['queueRegion']));

        unset($_SESSION['queueName']);
        unset($_SESSION['queueRegion']);
        unset($_SESSION['inQueue']);

        $msg = "You have left the queue!";
    }

}

if (isset($_POST['add']) && isset($_POST['region'])) {

    $_POST['add'] = filter_var($_POST['add'], FILTER_SANITIZE_STRING);

    /* Check if Reserved - Entering Name */
    $checkReserved = $conn->prepare("SELECT COUNT(r_id) FROM quakechampions_reserved WHERE r_name = ?");
    $checkReserved->execute(array($_POST['add']));
    if ($checkReserved->fetchColumn() > 0) $err = "The name you have entered is reserved and cannot be used publicly. If you are one of these players, please contact GNiK!";

    /* Check if Reserved - Entering PIN */
    $checkReservedB = $conn->prepare("SELECT COUNT(r_id) as rowCount, r_name FROM quakechampions_reserved WHERE r_pin = ?");
    $checkReservedB->execute(array((int) $_POST['add']));
    $getReservedB = $checkReservedB->fetch(PDO::FETCH_ASSOC);
    if ($getReservedB['rowCount'] > 0) { $err = null; $_POST['add'] = $getReservedB['r_name']; }
    
    /* Check if Name Exists */
    $checkName = $conn->prepare("SELECT COUNT(m_id) FROM quakechampions_matchmaking WHERE m_name = ?");
    $checkName->execute(array($_POST['add']));
    if ($checkName->fetchColumn() > 0) $err = "Cooldown! You must wait 15 seconds before trying to queue again!";

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
    if (!isset($_POST['region']) || !in_array($_POST['region'], ['NA', 'EU', 'OCE'])) $err = "Invalid region!";

    if (!$err || $err == null) {

        $skillRating = 1350;

        $alias = $NAMES[1][rand(0, count($NAMES[1]) - 1)] . $NAMES[2][rand(0, count($NAMES[2]) - 1)] . $NAMES[3][rand(0, count($NAMES[3]) - 1)];

        /* Skillrating, make highest Skill Rating max out at 2200 */
        if (($res['playerRatings']['duel']['rating'] + $res['playerRatings']['duel']['deviation']) > 2300)
            $skillRating = 2300;
        else
            $skillRating = ($res['playerRatings']['duel']['rating'] + $res['playerRatings']['duel']['deviation']);

        /* Add Name to Queue */
        $addName = $conn->prepare("INSERT INTO quakechampions_matchmaking ( m_name, m_alias, m_region, m_updated, m_skillrating ) VALUES ( ?, ?, ?, ?, ? )");
        $addName->execute(array($_POST['add'], $alias, $_POST['region'], time(), $skillRating));

        if ($addName->rowCount() > 0) {
            $_COOKIE['savedName'] = $_POST['add'];
            $_SESSION['inQueue'] = true;
            $_SESSION['queueName'] = $_POST['add'];
            $_SESSION['queueRegion'] = $_POST['region'];

            $msg = "You are now in queue!";
        }
    }
}

/* JSON */
header('Content-Type: application/json');
echo json_encode(['error' => $err, 'success' => $msg, 'redirect' => $redirect, 'stats' => $stats, 'queue' => $queue]);
exit;

?>