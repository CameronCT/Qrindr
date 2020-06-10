'use strict';
const express           = require('express');
const session           = require('express-session');
const app               = express();
const http              = require('http').Server(app);
const io                = require('socket.io')(http);
const cors              = require('cors');
var crypto              = require('crypto');
const config            = require('./config.js');

const mysql             = require('mysql');
const conn              = mysql.createConnection({ host: config.MariaDB.Host, user: config.MariaDB.User, password: config.MariaDB.Pass, database: config.MariaDB.Name });

app.use(cors({ credentials: true, origin: '*' }));
app.use(session({ secret: config.Session.secret, resave: true, saveUninitialized: true }));

app.get('/auth/session', (req, res) => {
    return res.send(req.session);
})
app.get('/getMatch', (req, res) => {

});

app.get('/getMatches', (req, res) => {
    let data = {};
    conn.query("SELECT matchId, matchHash, matchPlayerOne, matchPlayerTwo, matchCreated FROM matches ORDER BY matchId DESC", function(err, rows, fields) {
        if (rows) {
            data = rows;
        }
        return res.send({ data });
    });
});

app.get('/getGames', (req, res) => {
    let data = {};
    conn.query("SELECT gameId, gameName FROM games ORDER BY gameName", function(err, rows, fields) {
        if (rows) {
            data = rows;
        }
        return res.send({ data });
    });
});

app.post('/updateMatch', (req, res) => {
    let error = "";
    let success = "";

    let step = req.body.step;
    let value = req.body.value;

    if (!req.body.step || !req.body.value) {
        error = 'Invalid information supplied!';
        return res.send({error, success});
    }
});

app.post('/createMatch', (req, res) => {

    let error       = "";
    let success     = "";
    let redirect    = "";

    let gameId          =   req.body.gameId;
    let gameFormat      =   req.body.gameFormat;
    let playerName1     =   req.body.player1;
    let playerName2     =   req.body.player2;
    let cointoss        =   req.body.cointoss;
    let secret          =   req.body.secret;

    if (!gameId || !gameFormat || !playerName1 || !playerName2 || !cointoss || !secret) {
        error = 'Please make sure all fields are entered in correctly.';
        return res.send({ error, success });
    }

    if (!error) {
        let hash = crypto.randomBytes(20).toString('hex');
        let game = gameId + ':' + gameFormat;

        conn.query('INSERT INTO matches ( matchHash, matchUserOne, matchUserTwo, matchGame ) ( ?, ?, ?, ? )', [hash, playerName1, playerName2, game], function(err, rows, fields) {
            if (lastInsertId != 0) {
                success = 'Match successfully created';
                redirect = '/match/' + hash;
            }

            if (err) {
                error = 'Match not created';
            }

            return res.send({ error, success, redirect });
        });
    }

});

const server = http.listen(9000, () => {
    console.log('>> Started Server on Port 9000');
});