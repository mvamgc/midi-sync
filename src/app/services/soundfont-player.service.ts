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
    if (typeof AudioContext !== 'undefined') {
      this.audioContext = new AudioContext();
    }
    this.soundfont = Soundfont;
  }

  init() {
    return new Promise((resolve, reject) => {
      if (!this.initializing && !this.piano && this.audioContext) {
        this.initializing = true;
        this.soundfont.instrument(this.audioContext, this.instrument).then(function (piano: any) {
          this.piano = piano;
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
