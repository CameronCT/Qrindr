'use strict';
const express           = require('express');
const session           = require('express-session');
const app               = express();
const fetch             = require('node-fetch');
const btoa              = require('btoa');
const { catchAsync }    = require('./utils.js');
const http              = require('http').Server(app);
const io                = require('socket.io')(http);
const config            = require('./config.js');

app.use(express.static(__dirname + '/public'));

app.get('/login', (req, res) => {
    res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${config.OAUTH.Discord.Client}&scope=identify&response_type=code&redirect_uri=${config.OAUTH.Discord.Redirect}`);
});

app.get('/oauth/discord', catchAsync(async (req, res) => {
    if (!req.query.code) throw new Error('NoCodeProvided');
    const code = req.query.code;
    const creds = btoa(`${config.OAUTH.Discord.Client}:${config.OAUTH.Discord.Secret}`);
    const response = await fetch(`https://discordapp.com/api/oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${config.OAUTH.Discord.Redirect}`,
        {
            method: 'POST',
            headers: {
                Authorization: `Basic ${creds}`,
            },
        });
    const json = await response.json();
    console.log(json)
    res.redirect(`/?token=${json.access_token}`);
}));

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