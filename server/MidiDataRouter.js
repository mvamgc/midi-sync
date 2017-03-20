module.exports = class MidiDataRouter {

  addConnection(con) {
    console.log(`adding connection ${con}`);
    this.sendConnectionId(con);
  }

  sendConnectionId(con) {
    var connectionId = con.id; //generate random ?
    con.write(JSON.stringify({
      type: 'connected',
      connectionId: connectionId
    }));

    con.on('data', message => {
      console.log('Message received[1]: ' + message);
    });

  }
}
