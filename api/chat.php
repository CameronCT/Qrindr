<?php session_start(); require('core/autoload.php'); $_POST = json_decode(file_get_contents('php://input'),true);

$err = null;
$msg = null;
$type = null;

if (!isset($_GET['type']) || empty($_GET['type']) )
if ($_GET['type'] != 'view' && $_POST['type'] != 'post') exit;
if (!isset($_GET['uuid']) || empty($_GET['uuid'])) exit;

if ($_GET['type'] == "view") {

    $getChatq = $conn->prepare("SELECT q_id, q_player, q_message, q_datetime FROM quakechampions_chat WHERE q_uuid = ? ORDER BY q_id ASC");
    $getChatq->execute(array($_GET['uuid']));

    $data = $getChatq->fetchAll(PDO::FETCH_ASSOC);
    $count = count($data);
    for ($i = 0; $i < $count; $i++) {
        $data[$i]['q_message'] = filter_var($data[$i]['q_message'], FILTER_SANITIZE_STRING);
        $data[$i]['q_message'] = str_replace("&#39;", "'", $data[$i]['q_message']);
        $data[$i]['q_message'] = str_replace("&#34;", "\"", $data[$i]['q_message']);
    }

    /* JSON headers */
    header('Content-Type: application/json');
    echo json_encode([
        'error'  => null,
        'data'   => $data
    ]);
    exit;

}

if ($_GET['type'] == "post") {

    if (!isset($_POST['pwd']) || empty($_POST['pwd'])) exit;
    if (!isset($_POST['player']) || empty($_POST['player'])) exit;
    if (!isset($_POST['chatmessage']) || empty($_POST['chatmessage'])) $err = "You must type in a message!";
    if (strlen($_POST['chatmessage']) > 250) $err = "Your message cannot be greater than 250 characters!";

    $countMessages = $conn->prepare("SELECT COUNT(q_id) FROM quakechampions_chat WHERE q_uuid = ? AND q_player = ? AND q_datetime > DATE_SUB(NOW(), INTERVAL 1 MINUTE)");
    $countMessages->execute(array($_GET['uuid'], $_POST['player']));

    if ($countMessages->fetchColumn() >= 10)
        $err = "You have sent too many messages, try again in 60 seconds!";

    if (!$err) {
        $postChat = $conn->prepare("INSERT INTO quakechampions_chat ( q_uuid, q_player, q_message ) VALUES ( ?, ?, ? )");
        $postChat->execute(array($_GET['uuid'], $_POST['player'], $_POST['chatmessage']));

        if ($postChat->rowCount() > 0)
            $msg = "Success";
        else
            $err = "You are not a part of this match!";
    }

    /* JSON headers */
    header('Content-Type: application/json');
    echo json_encode([
        'error'     => $err,
        'success'   => $msg
    ]);
    exit;

}

?>
