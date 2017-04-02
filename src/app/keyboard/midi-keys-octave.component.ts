import {app} from '../app.module';

class KeysOctaveController {
  constructor() {
  }
}

export const keysOctave: angular.IComponentOptions = {
  template: require('./midi-keys-octave.html'),
  controller: KeysOctaveController
};

app.component('midiKeysOctave', keysOctave);
