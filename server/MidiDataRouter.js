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
    this.connections[con.id] = con;
    this.sendConnectionId(con);
  }
  removeConnection(conId) {
    if(this.conChannelMap[conId]) {
      var currentChannel = this.conChannelMap[conId];
      this.channelConMap[this.conChannelMap[conId]] = this.channelConMap[this.conChannelMap[conId]].filter(id => id !== conId);
      
      if(this.channelConMap[this.conChannelMap[conId]].length === 0) {
        delete this.channelConMap[this.conChannelMap[conId]];
      }

      delete this.conChannelMap[conId];
      delete this.connections[conId];
    }

    console.log('this.conChannelMap: ' + JSON.stringify(this.conChannelMap));
    console.log('this.channelConMap: ' + JSON.stringify(this.channelConMap));
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
    connections.forEach(conToSendId => {
      var msg2Send = Object.assign({}, msg);
      msg2Send.sendTs = new Date();
      if(conId === conToSendId) {
        msg2Send.echo = true;
      }
      console.log('send data to connection: ' + conToSendId);
      this.connections[conToSendId].write(JSON.stringify(msg2Send));
    });
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
        if (this.channelConMap[this.conChannelMap[conId]].length === 0) {
          delete this.channelConMap[this.conChannelMap[conId]];
        }
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
