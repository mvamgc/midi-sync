import * as Soundfont from 'soundfont-player';

import {app} from './app.module';

export class SoundfontPlayerService {
  instrument = 'acoustic_grand_piano';
  piano: any;

  /* @ngInject */
  constructor(private $timeout: angular.ITimeoutService) {}

  init() {
    Soundfont.instrument(new AudioContext(), this.instrument).then(function (piano: any) {
      this.piano = piano;
    }.bind(this));
  }

  play(note: string, octave: string) {
    if (this.piano) {
      let playValue = this.piano.start(note + octave);
      console.log(playValue);
      // this.$timeout(()=>this.piano.stop(playValue.id), 100);
    }
  }
}

app.service('soundfontPlayer', SoundfontPlayerService);
