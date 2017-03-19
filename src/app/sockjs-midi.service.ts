import {app} from './app.module';
import *  as SockJS from 'sockjs-client';

const URL = '/api/midi';

// todo: check, if required
interface BaseEvent extends Event {
  type: string;
}
interface OpenEvent extends BaseEvent {}
// interface CloseEvent extends IBaseEvent {
//   code: number;
//   reason: string;
//   wasClean: boolean;
// }
//
// interface MessageEvent extends IBaseEvent {
//   data: string;
// }
enum State {
  CONNECTING = 0, OPEN, CLOSING, CLOSED
}
interface SockJSClass {
  readyState: State;
  protocol: string;
  url: string;
  onopen: (e: OpenEvent) => any;
  onclose: (e: CloseEvent) => any;
  onmessage: (e: MessageEvent) => any;
  send(data: any): void;
  close(code?: number, reason?: string): void;
}

export class SockJSMidiService {
  sock: SockJSClass;
  openListeners: ((connectionId: string) => void)[] = [];
  closeListeners: (() => void)[] = [];
  dataMessageListeners: ((data) => void)[] = [];

  /* @ngInject */
  constructor(private $log: angular.ILogService) {
  }
  connect() {
    this.$log.log('Connecting to ' + URL);
    const sock = new SockJS(URL, {}, {});
    this.sock = sock;
    this.sock.onopen = function(event: OpenEvent) {
      console.log('open: %o', event);
      console.log('this.sock: %o', sock);
      // sock.send('test-1');
    };
    this.sock.onclose = function() {
      console.log('close');
      this.sendCloseNotifications();
    };
    this.sock.onmessage = this.onmessage.bind(this);
  }

  onOpen(openListener: (connectionId: string) => void) {
    this.openListeners.push(openListener);
  }

  onClose(closeListener: () => void) {
    this.closeListeners.push(closeListener);
  }

  close() {
    this.sock.close();
    this.sendCloseNotifications();
  }

  private sendCloseNotifications() {
    this.closeListeners.forEach(handler => handler());
  }

  private onmessage(event: MessageEvent) {
    console.log('message received at %s: %o', JSON.stringify(new Date()), event.data);
    const data = JSON.parse(event.data);
    if(data.type === 'connected') {
      this.openListeners.forEach(listener => listener(data.connectionId));
    }
  }

  sendMessage(msg) {
    var msgJson = JSON.stringify(msg);
    this.sock.send(msgJson);
  }
}

app.service('sockJSMidiService', SockJSMidiService);

