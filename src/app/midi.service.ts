import * as WebMidi from 'webmidi';

import {app} from '../index';

export class MidiService {
  /* @ngInject */
  constructor(private $log: ng.ILogService, private $q: ng.IQProvider) {}

  connect() {
    WebMidi.enable(err => {
      if (err) {
        this.$log.error('Error: ', err);
      }
    });
  }
}

app.service('MidiService', MidiService);
