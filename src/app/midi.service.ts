import * as WebMidi from 'webmidi';

import {app} from './app.module';

export class MidiService {
  /* @ngInject */
  constructor(private $log: ng.ILogService, private $q: ng.IQService) {}

  connect() {
    return this.$q((resolve, reject) => {
      WebMidi.enable(err => {
        if (err) {
          this.$log.error('Error: ', err);
          reject(err);
        } else {
          this.$log.log('WebMidi.outputs 2');
          this.$log.log(WebMidi.outputs);
          resolve();
        }
      });
    });
  }

  getOutputs() {
    return WebMidi.outputs;
  }
  getInputs() {
    return WebMidi.inputs;
  }
}

app.service('midiService', MidiService);
