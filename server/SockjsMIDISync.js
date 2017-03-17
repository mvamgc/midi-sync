
const sockjs = require('sockjs');

const sockjsOpts = {};

const sockjsMIDISync = sockjs.createServer(sockjsOpts);

sockjsMIDISync.on('connection', conn => {
  console.log('start connection: ' + conn.id);
});

module.exports = sockjsMIDISync;
