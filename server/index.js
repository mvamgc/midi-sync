'use strict';
const express = require('express');
const http = require('http');

const sockjsMIDISync = require('./SockjsMIDISync');

const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

sockjsMIDISync.installHandlers(server, {prefix: '/api/midi'});

app.use(express.static('dist'));

server.listen(port, () => console.log('app ' + process.pid + ' started on port ' + port));
