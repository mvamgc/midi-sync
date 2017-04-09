import {app} from '../app.module';
import {SoundfontPlayerService} from '../soundfont-player.service';
import {SockJSMidiService} from '../sockjs-midi.service';

class KeysOctaveController {
  pressedKeys = new Set();
  octave: string;

  /* @ngInject */
  constructor(private $timeout: angular.ITimeoutService, private $scope, private soundfontPlayer: SoundfontPlayerService, sockJSMidiService: SockJSMidiService) {
    sockJSMidiService.onDataMessage(data => {
      console.log('data in keys: %o %o %o', data.midi.note.name, data.midi.note.octave.toString(), this.octave);
      if (data.midi.note.octave.toString() === this.octave.toString()) {
        if (data.midi.type === 'noteon') {
          $scope.$apply(() => this.keyPress(data.midi.note.name));
        }
        if (data.midi.type === 'noteoff') {
          $scope.$apply(() => this.keyDepress(data.midi.note.name));
        }
      }
    });
  }

  keyPress(note: string) {
    console.log(`key press: ${note}`);
    this.pressedKeys.add(note);
    this.play(note);
    this.$timeout(() => this.pressedKeys.delete(note), 5000);
  }
  keyDepress(note: string) {
    console.log(`key depress: ${note}`);
    this.pressedKeys.delete(note);
  }

  keyClick(note: string) {
    // this.$timeout(() => {
    //   this.pressedKeys.delete(note);
    //   console.log(`key click: ${note}`);
    // }, 200);
  }

  isPressed(note: string): boolean {
    return this.pressedKeys.has(note);
  }

  play(note: string) {
    console.log(`playing ${note}${this.octave}`);
    this.soundfontPlayer.play(note, this.octave);
  }
}

export const keysOctave: angular.IComponentOptions = {
  template: require('./midi-keys-octave.html'),
  controller: KeysOctaveController,
  bindings: {
    octave: '<'
  }
};

app.component('midiKeysOctave', keysOctave);
