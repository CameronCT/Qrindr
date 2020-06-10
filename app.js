'use strict';
const express           = require('express');
const session           = require('express-session');
const app               = express();
const http              = require('http').Server(app);
const io                = require('socket.io')(http);
const cors              = require('cors');
const config            = require('./config.js');

const mysql             = require('mysql');
const conn              = mysql.createConnection({ host: config.MariaDB.Host, user: config.MariaDB.User, password: config.MariaDB.Pass, database: config.MariaDB.Name });

app.use(cors({ credentials: true, origin: '*' }));
app.use(session({ secret: config.Session.secret, resave: true, saveUninitialized: true }));

app.get('/auth/session', (req, res) => {
    return res.send(req.session);
})
app.get('/getMatch', (req, res) => {
    let returnData = [
        {
            id: "11412",
            uuid: "ade49ae07c904cde976e91a8d67a64c5",
            player1: "tt",
            player2: "gg",
            datetime: "2020-06-09 10:13:53",
            jsDatetime: "Jun 9, 2020"
        },
        {
            id: "11411",
            uuid: "48c63c3dc1613ed4c9abeea6451980f1",
            player1: "t",
            player2: "gglol",
            datetime: "2020-06-09 07:44:07",
            jsDatetime: "Jun 9, 2020"
        },
        {
            id: "11410",
            uuid: "b0e726d1782d5bb8723c2c8a637d9edb",
            player1: "gunk4ta",
            player2: "MalinkiFox",
            datetime: "2020-06-09 06:19:41",
            jsDatetime: "Jun 9, 2020"
        },
        {
            id: "11409",
            uuid: "d1da4aa6e6f5f545aa7d01d7681601f2",
            player1: "malinki",
            player2: "gunk4ta",
            datetime: "2020-06-09 05:38:53",
            jsDatetime: "Jun 9, 2020"
        },
        {
            id: "11408",
            uuid: "2f6e58bd5d1a44b691be5dd48697197f",
            player1: "d",
            player2: "c",
            datetime: "2020-06-09 04:17:13",
            jsDatetime: "Jun 9, 2020"
        },
        {
            id: "11407",
            uuid: "1fdfc19a3766d3323844019cc62b944c",
            player1: "c",
            player2: "d",
            datetime: "2020-06-09 03:36:16",
            jsDatetime: "Jun 9, 2020"
        },
        {
            id: "11406",
            uuid: "2279c97ecdfc29c07d171fba5d4e7e1f",
            player1: "c",
            player2: "d",
            datetime: "2020-06-09 02:27:03",
            jsDatetime: "Jun 9, 2020"
        },
        {
            id: "11405",
            uuid: "626c843b8991e3f9f6c9b946cd2befaf",
            player1: "b",
            player2: "a",
            datetime: "2020-06-09 02:25:37",
            jsDatetime: "Jun 9, 2020"
        },
        {
            id: "11404",
            uuid: "48e0228ed1c5f3dfe70515223e20b76c",
            player1: "m",
            player2: "j",
            datetime: "2020-06-08 23:19:36",
            jsDatetime: "Jun 8, 2020"
        },
        {
            id: "11403",
            uuid: "11a2b5b0430a50d0843d07c01339879a",
            player1: "Ton1",
            player2: "Almaril",
            datetime: "2020-06-08 20:12:45",
            jsDatetime: "Jun 8, 2020"
        },
        {
            id: "11401",
            uuid: "4f11ff1b6dc154cb7d32c051a48030e2",
            player1: "lur",
            player2: "flo",
            datetime: "2020-06-08 15:57:24",
            jsDatetime: "Jun 8, 2020"
        },
        {
            id: "11400",
            uuid: "ed602a9d402922a09bbbb81336b9a06e",
            player1: "ppz.c0l1n",
            player2: "pidor",
            datetime: "2020-06-08 15:32:54",
            jsDatetime: "Jun 8, 2020"
        }
    ];
    return res.send({ data: returnData });
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

const server = http.listen(process.env.PORT || 8000, () => {
    console.log('>> Started Server on Port 8000');
});