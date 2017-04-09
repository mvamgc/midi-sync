import * as Soundfont from 'soundfont-player';

import {app} from './app.module';

export class SoundfontPlayerService {
  instrument = 'acoustic_grand_piano';
  piano: any;
  initializing = false;

  /* @ngInject */
  constructor(private $timeout: angular.ITimeoutService) {
    this.init();
  }

  init() {
    if (!this.initializing && !this.piano) {
      Soundfont.instrument(new AudioContext(), this.instrument).then(function (piano: any) {
        this.piano = piano;
        this.initializing = false;
      }.bind(this));
    }
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
