const express           = require('express');
const session           = require('express-session');
const app               = express();
const http              = require('http').Server(app);
const io                = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

app.get('/pingServer', (req, res) => {
    res.send({ express: 'Working' });
});

app.get('/getMatch', (req, res) => {
    return res.send({ data: 'working' });
});

const server = http.listen(process.env.PORT || 8000, () => {
    console.log('>> Started Server on Port 8000');
});