export enum MidiMessageType {
  TEST = 1,
  MIDI = 2,
  CHANNEL_SWITCH = 3
}

/**
 * The interface is based on format provided by webmidi.
 * See https://github.com/cotejp/webmidi
 */
export interface IMidiMessage {
  /** Raw MIDI data */
  data?: any;
  note: {
    number?: number,
    name: string,
    octave: number
  };
  rawVelocity?: number;
  velocity?: number;
  /** MIDI timestamp, so it is a number */
  timestamp?: number;
  type?: string;
  channel?: number;
}

/**
 * Network message.
 */
export interface IMidiNetworkMessage {
  type: MidiMessageType;
  channel: string;
  midi?: IMidiMessage;
  /** Time when message is sent */
  sendCl?: Date;
}

