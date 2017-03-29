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

  latencyRecTime = 60000;
  latencyTable: {time: number, latency: number, timeStr: string}[] = [];
  latencySummary: string;

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
    if (data.type === 'midi' && !data.echo) {
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
          this.output.send(status, rawData);
        // }, 1000);
      }
    }
    var latency = new Date().getTime() - new Date(data.sendCl).getTime();
    console.log('latency: %o ms', latency);
    this.recordLatency(latency);
  }

  recordLatency(latency: number) {
    var now = new Date().getTime();
    this.latencyTable.push({time: now, latency, timeStr: new Date().toString()});
    this.latencyTable = this.latencyTable.filter(lr => now - lr.time < this.latencyRecTime);

    this.latencySummary = '';
    if (this.latencyTable.length > 0) {
      let min = this.latencyTable[0].latency;
      let max = this.latencyTable[0].latency;
      let total = 0;
      let totalSq = 0;
      for (let i = 0; i < this.latencyTable.length; i++) {
        if (min > this.latencyTable[i].latency) {
          min = this.latencyTable[i].latency;
        }
        if (max < this.latencyTable[i].latency) {
          max = this.latencyTable[i].latency;
        }
        total += this.latencyTable[i].latency;
      }
      let average = total / this.latencyTable.length;
      for (let i = 0; i < this.latencyTable.length; i++) {
        totalSq += (this.latencyTable[i].latency - average) * (this.latencyTable[i].latency - average);
      }

      this.latencySummary = `Latency summary for last ${this.latencyRecTime / 1000} seconds: numberOfRex=${this.latencyTable.length}, min=${min}, max=${max}, average=${average}, deviation=${Math.sqrt(totalSq / this.latencyTable.length)}`;
      console.log(this.latencySummary);
    }
    // console.table(this.latencyTable);
  }
}

app.service('midiService', MidiService);
