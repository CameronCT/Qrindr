'use strict';
const express           = require('express');
const session           = require('express-session');
const app               = express();
const http              = require('http').Server(app);
const io                = require('socket.io')(http);
const cors              = require('cors');
const crypto            = require('crypto');
var bodyParser          = require('body-parser')
const config            = require('./config.js');

const mysql             = require('mysql');
const conn              = mysql.createConnection({ host: config.MariaDB.Host, user: config.MariaDB.User, password: config.MariaDB.Pass, database: config.MariaDB.Name });

app.use(cors({ credentials: true, origin: '*' }));
app.use(session({ secret: config.Session.secret, resave: true, saveUninitialized: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/auth/session', (req, res) => {
    return res.send(req.session);
})

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

app.get('/getMatch', (req, res) => {
    let data = [];
    let error = "";
    let success = "";

    /*
     * Get Game Configs
     */
    const gameConfigs = require('./data/Games');
    const gameConfig = gameConfigs['QuakeChampions_BO3'];
    data['Config'] = gameConfig;
    data.isAuthenticated = false;

    /*
     * Get Query
     * Params: matchHash, playerName, Secret
     */
    const { matchHash, playerName, secret } = req.query;
    if (!matchHash) {
        error = "Please make sure all fields are entered correctly!";
        return res.send({ error, success });
    }

    /*
     * Check if there is a Player and Secret
     */
    if (playerName && secret) {
        data.isAuthenticated = true;
    }

    /*
     * Get Query
     */
    conn.query(`
        SELECT
            matchId, matchHash, matchPlayerOne, matchPlayerTwo, matchGame, matchFormat, matchSecret, matchCointoss, matchCreated
        FROM
            matches
         WHERE
           matchHash = ?
    `, [matchHash], function(error, rows) {

        if (error) {
            error = "Unable to get match information";
            return res.send({ error, success });
        } else if (!error && rows) {
            /*
             * Format Data
             */
            data['Match'] = {
                matchId: rows[0].matchId,
                matchHash: rows[0].matchHash,
                matchPlayerOne: rows[0].matchPlayerOne,
                matchPlayerTwo: rows[0].matchPlayerTwo,
                matchGame: rows[0].matchGame,
                matchFormat: rows[0].matchFormat,
                matchSecret: rows[0].matchSecret,
                matchCointoss: rows[0].matchCointoss,
                matchCreated: rows[0].matchCreated.toLocaleTimeString()
            }

            /*
             * get Match Data
             */
            conn.query(`
                SELECT
                    matchDataId, matchDataMatchId, matchDataPlayer, matchDataStep, matchDataValue
                 FROM
                    matches_data
                 WHERE
                    matchDataMatchId = ?
                 ORDER BY
                    matchDataId ASC
            `, [data['Match'].matchId], function (error, rows) {
                if (error) {
                    error = "Unable to get match information";
                    return res.send({error, success});
                } else if (!error && rows) {
                    /*
                     * Format Data
                     */
                    let i;
                    for (i = 0; i < rows.length; i++) {
                        data['Data'][i] = {
                            matchDataId: rows[i].matchDataId,
                            matchDataPlayer: rows[i].matchDataPlayer,
                            matchDataStep: rows[i].matchDataStep,
                            matchDataValue: rows[i].matchDataValue
                        };
                    }
                    return res.send({ error, success, data: { Config: data.Config, Match: data.Match, Data: data.Data, isAuthenticated: data.isAuthenticated } });
                }
            });
        }
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

    const formData = req.body;

    const gameId          =   formData.gameId;
    const gameFormat      =   formData.format;
    let playerName1     =   formData.player1;
    let playerName2     =   formData.player2;
    const cointoss        =   formData.cointoss;
    const secret          =   formData.secret;

    /*
     * Make sure all fields are filled out
     */
    if (!gameId || !gameFormat || !playerName1 || !playerName2 || !cointoss || !secret) {
        error = 'Please make sure all fields are entered in correctly.';
        return res.send({ error, success });
    }

    /*
     * Assure that player1 cannot be the same name as player2
     */
    if (playerName1 === playerName2) {
        error = 'You cannot use the same names for both players!';
        return res.send({ error, success });
    }

    if (!error) {

        /*
         * Cointoss
         *  0 = Random
         *  1 = You
         *  2 = Opponent
         */
        let currentPlayer = playerName1;
        let flip = Math.round(Math.random());
        if (cointoss === 0 && flip === 1 || cointoss === 2) {
            playerName1 = playerName2;
            playerName2 = currentPlayer;
        }

        /*
         * Create
         */
        let hash = crypto.randomBytes(20).toString('hex');
        conn.query('INSERT INTO matches ( matchHash, matchPlayerOne, matchPlayerTwo, matchGame, matchFormat, matchCointoss ) VALUES ( ?, ?, ?, ?, ?, ? )', [hash, playerName1, playerName2, gameId, gameFormat, cointoss], function(err, rows) {
            if (err) {
                console.log(err);
            }
            if (!err && rows.insertId !== 0) {
                success = `/match/${hash}/${playerName1}/test`;
            }
            return res.send({ error, success });
        });
    }

});

http.listen(9000, () => {
    console.log('>> Started Server on Port 9000');
});