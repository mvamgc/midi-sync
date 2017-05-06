import * as Soundfont from 'soundfont-player';

import {Injectable} from '@angular/core';
import {IMidiMessage} from './MidiMessage';

@Injectable()
export class SoundFontPlayerService {
  instrument = 'acoustic_grand_piano';
  piano: any;
  initializing = false;

  constructor() {
    // this.init();
  }

  init() {
    if (!this.initializing && !this.piano) {
      Soundfont.instrument(new AudioContext(), this.instrument).then(function (piano: any) {
        this.piano = piano;
        this.initializing = false;
      }.bind(this));
    }
  }

  sendMidiMessage(midiMessage: IMidiMessage) {
    if (this.piano) {
      let playValue = this.piano.start(midiMessage.note.name + (midiMessage.note.octave + 2));
      console.log(playValue);
      // this.$timeout(()=>this.piano.stop(playValue.id), 100);
    }
  }
}
