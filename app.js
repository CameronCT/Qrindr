'use strict';
const express           = require('express');
const session           = require('express-session');
const app               = express();
const fetch             = require('node-fetch');
const btoa              = require('btoa');
const { catchAsync }    = require('../utils');
const http              = require('http').Server(app);
const io                = require('socket.io')(http);
const config            = require('./config.js');

app.use(express.static(__dirname + '/public'));

router.get('/login', (req, res) => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${config.OAUTH.Discord.Client}&scope=identify&response_type=code&redirect_uri=${config.OAUTH.Discord.Redirect}`);
});

app.get('/getMatch', (req, res) => {
    return res.send({ data: 'working' });
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