const express = require('express');
const app = express();
const port = 3000;

app.get('/health', (req, res) => {
    res.send('App running!');
});

app.post('/vote', (req, res) => {
    res.send('Vote Submitted');
})

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`);
})