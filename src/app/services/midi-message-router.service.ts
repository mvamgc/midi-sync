import {Injectable} from '@angular/core';
import {IMidiMessage} from './MidiMessage';
import {SoundFontPlayerService} from './soundfont-player.service';

@Injectable()
export class MidiMessageRouterService {
  constructor(private soundFontPlayerService: SoundFontPlayerService) {
    this.soundFontPlayerService.init();
  }

  dispatchMidiMessage(midiMsg: IMidiMessage) {
    this.soundFontPlayerService.sendMidiMessage(midiMsg);
  }
}
