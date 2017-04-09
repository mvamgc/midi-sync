import {app} from '../app.module';
import {SoundfontPlayerService} from '../soundfont-player.service';

class KeysOctaveController {
  pressedKeys = new Set();
  octave: string;

  /* @ngInject */
  constructor(private $timeout: angular.ITimeoutService, private soundfontPlayer: SoundfontPlayerService) {
    this.soundfontPlayer.init();
  }

  keyPress(note: string) {
    console.log(`key press: ${note}`);
    this.pressedKeys.add(note);
    this.play(note);
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
