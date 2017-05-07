// import {app} from './app.module';
import {generate} from 'project-name-generator';
import {SockJSMidiService} from './services/sockjs-midi.service';
import {MidiService} from './services/midi.service';

const CONNECT = 'Connect';
const CONNECTING = 'Connecting';

class ServerControl {
  channel: string;
  connected: boolean;
  connecting: boolean;
  connectionButton: string = CONNECT;

  /* @ngInject */
  constructor(private $log: angular.ILogService, private $scope: angular.IScope, private $timeout: angular.ITimeoutService, private sockJSMidiService: SockJSMidiService, private midiService: MidiService) {
    this.channel = generate({ number: true}).dashed;
    midiService.setServerChannel(this.channel);
    this.connected = false;
    this.connecting = false;
  }

  onChannelChange() {
    this.midiService.setServerChannel(this.channel);
  }

  connect() {
    this.connecting = true;
    this.connectionButton = CONNECTING;
    this.sockJSMidiService.connect();
    this.sockJSMidiService.onOpen(connectionId => {
      this.$scope.$apply(() => {
        console.log('Connectionid: ' + connectionId);
        this.connected = true;
        this.connecting = false;
        this.connectionButton = CONNECT;
      });
    });
    this.sockJSMidiService.onClose(() => {
      this.$timeout(() => {
        this.connected = false;
        this.connecting = false;
        this.connectionButton = CONNECT;
      });
    });
  }

  close() {
    this.sockJSMidiService.close();
    this.connected = false;
    this.connecting = false;
    this.connectionButton = CONNECT;
  }

  sendTestMessage1() {
    this.sockJSMidiService.sendMessage({type: 'test1', channel: this.channel});
  }
  sendTestMessage2() {
    this.sockJSMidiService.sendMessage({type: 'test2', channel: this.channel});
  }
}

export const serverControlComponent: angular.IComponentOptions = {
  template: require('./server-control.html'),
  controller: ServerControl
};

// app.component('serverControl', serverControlComponent);
