const express = require('express');

const dbclass = require('./dbhelper');

const dbhelper = new dbclass();
const app = express();
const port = 3000;

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
    res.send('Vote Submitted');
})

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
})