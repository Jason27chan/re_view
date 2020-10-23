const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const dbhelper = require('./dbhelper');
const keys = require('./config/keys');

const app = express();
const port = 5000;

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken, refreshToken, profile, done) => {
        console.log('access token', accessToken);
        console.log('refresh token', refreshToken);
        console.log('profile', profile);
    })
);

app.use(express.urlencoded({extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/health', (req, res) => {
    res.send('App running!');
});

app.post('/vote', (req, res) => {
    dbhelper.submitVote(req.body.choice);
    res.send('Vote Submitted');
})

app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback', passport.authenticate('google'));

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
})