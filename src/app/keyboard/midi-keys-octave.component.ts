import {app} from '../app.module';

class KeysOctaveController {
  pressedKeys = new Set();

  /* @ngInject */
  constructor(private $timeout: angular.ITimeoutService) {}

  keyPress(note: string) {
    console.log(`key press: ${note}`);
    this.pressedKeys.add(note);
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
}

export const keysOctave: angular.IComponentOptions = {
  template: require('./midi-keys-octave.html'),
  controller: KeysOctaveController
};

app.component('midiKeysOctave', keysOctave);
