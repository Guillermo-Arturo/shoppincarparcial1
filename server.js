'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

var path = require('path');

// App
const app = express();

app.use('/', express.static(path.join(__dirname + '/')));

app.get('/', (req, res) => {
  res.sendfile('index.html');
});

app.get('/shoppingcar', (req, res) => {
    res.sendfile('shoppingcar.html');
});

app.get('/maps', (req, res) => {
    res.sendfile('maps.html');
});

app.get('/youtube_channel', (req, res) => {
    res.sendfile('youtube_channel.html');
});

app.listen(PORT, HOST);
console.log(`Corriendo en puerto http://${HOST}:${PORT}`);
