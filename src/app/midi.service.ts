import * as WebMidi from 'webmidi';

import {app} from './app.module';

export class MidiService {
  listeners = [
    {
      event: 'noteon',
      listener: this.noteonListener.bind(this)
    }, {
      event: 'noteoff',
      listener: this.noteoffListener.bind(this)
    }
  ];
  output;

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $q: ng.IQService) {}

  connect() {
    return this.$q((resolve, reject) => {
      WebMidi.enable(err => {
        if (err) {
          this.$log.error('Error: ', err);
          reject(err);
        } else {
          this.$log.log('WebMidi.outputs 2');
          this.$log.log(WebMidi.outputs);
          resolve();
        }
      });
    });
  }

  getOutputs() {
    return WebMidi.outputs;
  }
  getInputs() {
    return WebMidi.inputs;
  }

  deactivateInput(input) {
    this.listeners.forEach(listener => {
      input.removeListener(listener.event);
    });
  }
  activateInput(input) {
    this.listeners.forEach(listener => {
      input.addListener(listener.event, 'all', listener.listener);
    });
  }

  activateOutput(output) {
    this.output = output;
  }

  filterNoteData(note) {
    return {
      data: note.data,
      note: note.note,
      rawVelocity: note.rawVelocity,
      timestamp: note.timestamp,
      type: note.type,
      channel: note.channel,
      velocity: note.velocity,
      receivedTime: note.receivedTime,
      value: note.value,
      controller: note.controller
    };
  }
  noteonListener(noteonEvent) {
    let noteData = this.filterNoteData(noteonEvent);
    console.log("noteon: %o", JSON.stringify(noteData));
    this.sendEvent(noteData);
  }
  noteoffListener(noteoffEvent) {
    let noteData = this.filterNoteData(noteoffEvent);
    console.log("noteon: %o", JSON.stringify(noteData));
    this.sendEvent(noteData);
  }

  sendEvent(noteData) {
    if(this.output) {
      setTimeout(() => {
        // this.output.playNote(noteData.note.name + noteData.note.octave);
        // this.output.sendData();
        console.log('noteData.data: %o', noteData.data);
        var status = noteData.data[0];
        var rawData = [];
        for(var i=1; i<noteData.data.length; i++) {
          rawData.push(noteData.data[i]);
        }
        console.log('sending status: %o', status);
        console.log('sending rawData: %o', rawData);
        this.output.send(status, rawData);
      }, 2000);
    }
  }


}

app.service('midiService', MidiService);
