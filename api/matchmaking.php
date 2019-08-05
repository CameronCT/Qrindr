<?php session_start(); require('core/autoload.php'); if (isset($_POST)) $_POST = json_decode(file_get_contents('php://input'),true);
$err = null;
$msg = null;
$qcapi = "https://stats.quake.com/api/v2/Player/Stats?name=";

if (isset($_GET['update'])) {

    $getQueue = $conn->query("SELECT m_id, m_name, m_updated, m_datetime FROM quakechampions_matchmaking");

    /* Remove everyone that's been inactive for more than 5 minutes */
    foreach ($getQueue->fetchAll(PDO::FETCH_ASSOC) as $v) {
        if ( ($v['m_updated'] - 60) > time())
            $removeQueue = "";
    }

} 

if (isset($_POST['add'])) {

    /* Check if Name Exists */
    $checkName = $conn->prepare("SELECT COUNT(m_id) FROM quakechampions_matchmaking WHERE m_name = ?");
    $checkName->execute(array($_POST['add']));
    if ($checkName->fetchColumn() > 0) $err = "This name is already in queue!";

    /* Check if QC Name Exists */
    $res = json_decode(file_get_contents($qcapi . filter_var($_POST['add'], FILTER_SANITIZE_STRING)));
    if ($res['code'] == 404)
        $err = "Invalid name!";

    if (!$err || $err == null) {
        /* Add Name to Queue */
        $addName = $conn->prepare("INSERT INTO quakechampions_matchmaking ( m_name ) VALUES ( ? )");
        $addName->execute(array($_POST['add']));

        if ($addName->rowCount() > 0) {
            $_COOKIE['savedName'] = $_POST['add'];
        }
    }

}

?>