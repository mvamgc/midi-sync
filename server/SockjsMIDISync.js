const sockjs = require('sockjs');

const sockjsOpts = {};
const sockjsMIDISync = sockjs.createServer(sockjsOpts);

const MidiDataRouter = require('./MidiDataRouter');
const midiDataRouterInstance = new MidiDataRouter();

sockjsMIDISync.on('connection', conn => {
  console.log('start connection: ' + conn.id);
  midiDataRouterInstance.addConnection(conn);
});

sockjsMIDISync.on('data', message => {
  console.log('Message received: ' + JSON.stringify(message));
});

module.exports = sockjsMIDISync;