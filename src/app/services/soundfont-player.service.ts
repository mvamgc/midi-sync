import * as Soundfont from 'soundfont-player';

import {Injectable} from '@angular/core';
import {IMidiMessage} from './MidiMessage';

@Injectable()
export class SoundFontPlayerService {
  instrument = 'acoustic_grand_piano';
  piano: any;
  initializing = false;

  audioContext: AudioContext;
  soundfont: any;

  constructor() {
    // this.init();
    if (typeof AudioContext !== 'undefined') {
      this.audioContext = new AudioContext();
    }
    this.soundfont = Soundfont;
  }

  init() {
    return new Promise((resolve, reject) => {
      console.log('init');
      if (!this.initializing && !this.piano && this.audioContext) {
        this.initializing = true;
        console.log('init 2');
        this.soundfont.instrument(this.audioContext, this.instrument).then(function (piano: any) {
          this.piano = piano;
          console.log('saved piano');
          this.initializing = false;
          resolve();
        }.bind(this));
      } else {
        reject();
      }
    });
  }

  sendMidiMessage(midiMessage: IMidiMessage) {
    if (this.piano) {
      let playValue = this.piano.start(midiMessage.note.name + (midiMessage.note.octave + 2));
      console.log(playValue);
      // this.$timeout(()=>this.piano.stop(playValue.id), 100);
    }
  }
}
