module.exports = class MidiDataRouter {
  // channelConMap;
  // conChannelMap;
  // connections;

  constructor() {
    this.channelConMap = {};
    this.conChannelMap = {};
    this.connections = {};
  }

  addConnection(con) {
    console.log(`adding connection ${con}`);
    this.sendConnectionId(con);
  }

  sendConnectionId(con) {
    const connectionId = con.id; // generate random ?
    con.write(JSON.stringify({
      type: 'connected',
      connectionId
    }));
  }

  routeMessage(conId, msg) {
    this.updateChannelForConnection(conId, msg.channel);
    const connections = this.channelConMap[msg.channel];
    console.log('send data to connections: ' + connections);
  }

  updateChannelForConnection(conId, channel) {
    // todo: delete outdated channels
    console.log(`conId: ${conId}, channel: ${channel}`);
    if (this.conChannelMap[conId] !== channel) {
      console.log('updating channel');
      if (this.conChannelMap[conId] && !this.channelConMap[this.conChannelMap[conId]]) {
        this.channelConMap[this.conChannelMap[conId]] = [];
      }
      if (this.conChannelMap[conId]) {
        this.channelConMap[this.conChannelMap[conId]] = this.channelConMap[this.conChannelMap[conId]].filter(id => id !== conId);
      }
      if (!this.channelConMap[channel]) {
        this.channelConMap[channel] = [];
      }
      // channel on the connection was changed, update both maps.
      this.channelConMap[channel].push(conId);
      this.conChannelMap[conId] = channel;
    }
    console.log('this.conChannelMap: ' + JSON.stringify(this.conChannelMap));
    console.log('this.channelConMap: ' + JSON.stringify(this.channelConMap));
  }


};
