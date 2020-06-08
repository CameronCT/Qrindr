'use strict';
const express           = require('express');
const session           = require('express-session');
const app               = express();
const http              = require('http').Server(app);
const io                = require('socket.io')(http);
const jwt               = require('jsonwebtoken');
const config            = require('./config.js');

const passport          = require('passport');
const DiscordStrategy   = require('passport-discord').Strategy;

const mysql             = require('mysql');
const conn              = mysql.createConnection({ host: config.MariaDB.Host, user: config.MariaDB.User, password: config.MariaDB.Pass, database: config.MariaDB.Name });

const User              = require('./methods/User.js')(conn, jwt, config);

app.use(session({ secret: config.Session.secret, resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

/* Discord */
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user); });
passport.use(new DiscordStrategy({
    clientID: config.OAUTH.Discord.Client,
    clientSecret: config.OAUTH.Discord.Secret,
    callbackURL: config.OAUTH.Discord.Redirect,
    scope: ['identify']
},
function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ authId: profile.id, userName: profile.username, avatar: profile.avatar }, function(err, user) {
        return cb(err, user);
    });
}));

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    let token = User.createJWT(req.user);
    res.cookie('token', token, { maxAge: config.JWT.expiryMax })
    res.end()
    res.redirect('/')
});
app.get('/auth/session', (req, res) => {
    return res.send(req.session);
})
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