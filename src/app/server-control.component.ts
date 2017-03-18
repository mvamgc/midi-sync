import {app} from './app.module';
import {generate} from 'project-name-generator';
import {SockJSMidiService} from './sockjs-midi.service';

const CONNECT = 'Connect';
const CONNECTING = 'Connecting';

class ServerControl {
  channel: string;
  connected: boolean;
  connecting: boolean;
  connectionButton: string = CONNECT;

  /* @ngInject */
  constructor(private $log: angular.ILogService, private sockJSMidiService: SockJSMidiService) {
    this.channel = generate({ number: true}).dashed;
    this.connected = false;
    this.connecting = false;
  }
  connect() {

    this.connecting = true;
    this.connectionButton = CONNECTING;
    this.sockJSMidiService.connect();
  }
}

export const serverControlComponent: angular.IComponentOptions = {
  template: require('./server-control.html'),
  /* @ngInject */
  controller: ServerControl
};

app.component('serverControl', serverControlComponent);
