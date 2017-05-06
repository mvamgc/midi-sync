import {app} from '../app.module';
import {SoundFontPlayerService} from '../services/soundfont-player.service';
import {SockJSMidiService} from '../services/sockjs-midi.service';
import {Component, Input} from '@angular/core';
import {MidiMessageRouterService} from '../services/midi-message-router.service';

@Component({
  selector: 'octave',
  template: require('./octave.html')
})
export class Octave {
  pressedKeys = new Set();
  @Input() octave: string;

  /* @ngInject */
  constructor(private messageRouterService: MidiMessageRouterService) {
    // todo: replace by MIDIMessageRouter
    /*
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
    */
  }

  keyPress(note: string) {
    console.log(`key press: ${note}`);
    this.pressedKeys.add(note);
    this.play(note);
    setTimeout(() => this.pressedKeys.delete(note), 5000);
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
    this.messageRouterService.dispatchMidiMessage({
      note: {
        name: note,
        octave: parseInt(this.octave, 10)
      }
    });
  }
}
