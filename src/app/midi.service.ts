import * as WebMidi from 'webmidi';

import {app} from './app.module';
import {SockJSMidiService} from './sockjs-midi.service';

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

  serverChannel: string;

  /* @ngInject */
  constructor(private $log: ng.ILogService, private $q: ng.IQService, private sockJSMidiService: SockJSMidiService) {
    sockJSMidiService.onDataMessage(this.playRemoteMidiMessage.bind(this));
  }

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

  setServerChannel(serverChannel: string) {
    this.serverChannel = serverChannel;
    console.log('---- setting server channel to %s', this.serverChannel);
  }

  getOutputs() {
    return WebMidi.outputs;
  }
  getInputs() {
    return WebMidi.inputs;
  }

  deactivateInput(input: any) {
    this.listeners.forEach(listener => {
      input.removeListener(listener.event);
    });
  }
  activateInput(input: any) {
    this.listeners.forEach(listener => {
      input.addListener(listener.event, 'all', listener.listener);
    });
  }

  activateOutput(output: any) {
    this.output = output;
  }

  filterNoteData(note: any) {
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
  noteonListener(noteonEvent: any) {
    let noteData = this.filterNoteData(noteonEvent);
    console.log('noteon: %o', JSON.stringify(noteData));
    this.sendEvent(noteData);
  }
  noteoffListener(noteoffEvent: any) {
    let noteData = this.filterNoteData(noteoffEvent);
    console.log('noteon: %o', JSON.stringify(noteData));
    this.sendEvent(noteData);
  }

  sendEvent(noteData: any) {
    this.sockJSMidiService.sendMessage({type: 'midi', channel: this.serverChannel, midi: noteData});
    /*
    if (this.output) {
      setTimeout(() => {
        // this.output.playNote(noteData.note.name + noteData.note.octave);
        // this.output.sendData();
        console.log('noteData.data: %o', noteData.data);
        var status = noteData.data[0];
        var rawData = [];
        for (var i = 1; i < noteData.data.length; i++) {
          rawData.push(noteData.data[i]);
        }
        console.log('sending status: %o', status);
        console.log('sending rawData: %o', rawData);
        this.output.send(status, rawData);
      }, 2000);
    }
    */
  }

  playRemoteMidiMessage(data: any) { // todo: define server message format
    console.log('remote data message received: %o', data);
    if (data.type === 'midi') { // && !data.echo
      let noteData = data.midi;
      if (this.output) {
        // setTimeout(() => {
          // this.output.playNote(noteData.note.name + noteData.note.octave);
          // this.output.sendData();
          console.log('noteData.data: %o', noteData.data);
          var status = noteData.data[0];
          var rawData = [];
          for (var i = 1; ; i++) {
            if (noteData.data[i] === undefined) {
              break;
            }
            rawData.push(noteData.data[i]);
          }

          // console.log('sending status: %o', status);
          // console.log('sending rawData: %o', rawData);
          var latency = new Date().getTime() - new Date(data.sendCl).getTime();
          console.log('latency: %o ms', latency);
          this.output.send(status, rawData);
        // }, 1000);
      }
    }
  }
}

app.service('midiService', MidiService);
