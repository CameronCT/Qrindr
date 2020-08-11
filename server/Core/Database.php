<?php

class Database {

    protected $conn;

    public function __construct(String $host, String $user, String $pass, String $name) {
        try {
        echo 'mysql:host=$host;dbname=$name';
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

    public function fetchColumn($query, $params = []) {
        $q = $this->conn->prepare($query);
        $q->execute($params);

        return $q->fetchColumn();
    }

    public function getBlogs($limit = 5) {
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

    public function getMatches($limit = 20) {
        return $this->fetchAll("
            SELECT
                matchId, matchHash, matchPlayerOne, matchPlayerTwo, matchConfig, matchCreated
            FROM
                matches
            ORDER BY
                matchId DESC
            LIMIT
                $limit
        ");
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