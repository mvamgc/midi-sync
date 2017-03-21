const sockjs = require('sockjs');

const sockjsOpts = {};
const sockjsMIDISync = sockjs.createServer(sockjsOpts);

const MidiDataRouter = require('./MidiDataRouter');
const midiDataRouterInstance = new MidiDataRouter();

sockjsMIDISync.on('connection', conn => {
  console.log('start connection: ' + conn.id);
  midiDataRouterInstance.addConnection(conn);

  conn.on('data', message => {
    console.log(`Message received[1]: ${message} from ${conn.id}`);
    midiDataRouterInstance.routeMessage(conn.id, JSON.parse(message));
  });
});


module.exports = sockjsMIDISync;
