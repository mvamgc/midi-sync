import {MidiDataRouter} from './MidiDataRouter';

const sockjs = require('sockjs');

const sockjsOpts = {};

const sockjsMIDISync = sockjs.createServer(sockjsOpts);

const midiDataRouterInstance = new MidiDataRouter();

sockjsMIDISync.on('connection', conn => {
  console.log('start connection: ' + conn.id);
  midiDataRouterInstance.addConnection(conn);
});

module.exports = sockjsMIDISync;
