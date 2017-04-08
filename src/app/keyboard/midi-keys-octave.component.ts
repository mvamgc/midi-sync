import {app} from '../app.module';

class KeysOctaveController {
  pressedKeys = new Set();

  keyPress(note: string) {
    console.log(`key press: ${note}`);
    this.pressedKeys.add(note);
  }
  keyDepress(note: string) {
    console.log(`key depress: ${note}`);
    this.pressedKeys.delete(note);
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
