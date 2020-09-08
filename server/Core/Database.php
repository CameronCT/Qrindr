<?php

class Database {

    protected $conn;

    public function __construct(String $host, String $user, String $pass, String $name) {
        try {
            $this->conn = new PDO('mysql:host=' . $host . ';dbname=' . $name . '', $user, $pass);
        } catch (PDOException $e) {
            print "Error!: " . $e->getMessage() . "<br/>";
            die();
        }
    }

    public function query($query, $params = []) {
        $q = $this->conn->prepare($query);
        $q->execute($params);

        return $q->rowCount();
    }

    public function fetchAll($query, $params = []) {
        $q = $this->conn->prepare($query);
        $q->execute($params);

        return $q->fetchAll(PDO::FETCH_ASSOC);
    }

    public function fetch($query, $params = []) {
        $q = $this->conn->prepare($query);
        $q->execute($params);

        return $q->fetch(PDO::FETCH_ASSOC);
    }

    public function fetchColumn($query, $params = []) {
        $q = $this->conn->prepare($query);
        $q->execute($params);

        return $q->fetchColumn();
    }

    public function getBlogs(String $limit) {
        return $this->fetchAll("
            SELECT
                blogId, blogTitle, blogThumbnail, blogHref, blogGame, blogCreated
            FROM
                blogs
            ORDER BY
                blogId DESC
            LIMIT
                $limit
        ");
    }

    public function addStepToMatch(String $matchId, String $matchStepValue) {

        return $this->query("
            INSERT INTO
                matchesSteps
            ( matchStepMatch, matchStepValue )
                VALUES
            ( ?, ? )
        ", [$matchId, $matchStepValue]);
    }

    public function getDataFromMatchHash(String $matchHash) {
        return $this->fetch("
            SELECT
                matchId, matchConfig, matchHash, matchSecret, matchPlayerOne, matchPlayerTwo, matchFormat, matchCointoss, matchCreated
            FROM
                matches
            WHERE
                matchHash = ?
        ", [$matchHash]);
    }

    public function getStepsFromMatchId(String $matchId) {
        return $this->fetchAll("
            SELECT
                matchStepValue
            FROM
                matchesSteps
            WHERE
                matchStepMatch = ?
            ORDER BY
                matchStepId ASC
        ", [$matchId]);
    }

    public function getMatches(String $limit) {
        return $this->fetchAll("
            SELECT
                matchId, matchHash, matchPlayerOne, matchPlayerTwo, matchConfig, matchCreated
            FROM
                matches
            WHERE
                (SELECT COUNT(matchStepId) FROM matchesSteps WHERE matchStepMatch = matchId) >= 5
            ORDER BY
                matchId DESC
            LIMIT
                $limit
        ");
    }

    public function addMatch(String $matchHash, String $matchConfig, String $matchCointoss, String $playerOne, String $playerTwo, String $matchSecret) {
        return $this->query("
            INSERT INTO
                matches
            ( matchHash, matchConfig, matchCointoss, matchPlayerOne, matchPlayerTwo, matchSecret )
                VALUES
            ( ?, ?, ?, ?, ?, ? )
        ", [$matchHash, $matchConfig, $matchCointoss, $playerOne, $playerTwo, $matchSecret]);
    }

    public function countMatches() {
        return $this->fetchColumn("
            SELECT
                COUNT(matchId)
            FROM
                matches
        ");
    }

}