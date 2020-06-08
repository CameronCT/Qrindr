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

const passport          = require('passport');
const DiscordStrategy   = require('passport-discord').Strategy;
const FacebookStrategy  = require('passport-facebook').Strategy;
const GoogleStrategy    = require('passport-google-oauth').OAuthStrategy;

const conn              = mysql.createConnection({ host: config.MariaDB.Host, user: config.MariaDB.User, password: config.MariaDB.Pass, database: config.MariaDB.Name });

/* Discord */
passport.use(new DiscordStrategy({
    clientID: config.OAUTH.Discord.Client,
    clientSecret: config.OAUTH.Discord.Secret,
    callbackURL: config.OAUTH.Discord.Redirect,
    scope: ['identify']
},
function(accessToken, refreshToken, profile, cb) {

    console.log(profile);
    return false;

    /*
    User.findOrCreate({ discordId: profile.id }, function(err, user) {
        return cb(err, user);
    });
     */
}));


app.use(express.static(__dirname + '/public'));

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/') // Successful auth
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