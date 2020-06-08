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

/* Facebook */
passport.use(new FacebookStrategy({
        clientID: config.OAUTH.Facebook.Client,
        clientSecret: config.OAUTH.Facebook.Secret,
        callbackURL: config.OAUTH.Facebook.Redirect
    },
    function(accessToken, refreshToken, profile, cb) {
        console.log(profile);
        return false;
        /*
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
        */
    }
));

/* Google */
passport.use(new GoogleStrategy({
        consumerKey: config.OAUTH.Google.Secret,
        consumerSecret: config.OAUTH.Google.Secret,
        callbackURL: config.OAUTH.Google.Secret
    },
    function(token, tokenSecret, profile, done) {
        console.log(profile);
        return false;
        /*
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
            return done(err, user);
        });
        */
    }
));

app.use(express.static(__dirname + '/public'));

app.get('/auth/discord', passport.authenticate('discord'));
app.get('/auth/discord/callback', passport.authenticate('discord', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/') // Successful auth
});


app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/'
}), function(req, res) {
    res.redirect('/') // Successful auth
});

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback', passport.authenticate('facebook', {
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