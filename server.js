const express = require('express');
const app = express();

app.use("/public", express.static('./public/'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(8080, () => {
    console.log('Server listening on http://localhost:8080');
});