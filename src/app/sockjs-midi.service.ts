import {app} from './app.module';

const URL = '/api/midi';

export class SockJSMidiService {
  /* @ngInject */
  constructor(private $log: angular.ILogService) {

  }
  connect() {
    this.$log.log('Connecting to ' + URL);
  }

  close() {}
}

app.service('sockJSMidiService', SockJSMidiService);

