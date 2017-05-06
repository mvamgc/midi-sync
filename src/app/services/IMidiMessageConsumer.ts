import {IMidiMessage} from './MidiMessage';

export interface IMidiMessageConsumer {
  init();
  sendMidiMessage(midiMessage: IMidiMessage);
}
