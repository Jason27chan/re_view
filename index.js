const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const dbclass = require('./dbhelper');
const keys = require('./config/keys');

const dbhelper = new dbclass();
const app = express();
const port = 3000;

passport.use(
    new GoogleStrategy({
        clientID: keys.googleClientId,
        clientSecret: keys.googleClientSecret,
        callbackURL: '/auth/google/callback'
    }, (accessToken) => {
        console.log(accessToken)
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
    dbhelper.submitVote('A');
    dbhelper.submitVote(req.body.choice);
    res.send('Vote Submitted');
})

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
})