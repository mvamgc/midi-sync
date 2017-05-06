import {MidiMessageRouterService} from './midi-message-router.service';
import {IMidiMessage} from './MidiMessage';

class MockSoundFontPlayerService {
  init() {
    // do nothing
  }
  sendMidiMessage(midiMessage: IMidiMessage) {
    // do nothing
  }
}
describe('midiMessageRouterService service', () => {
  let soundFontPlayerService;
  let midiMessageRouterService;

  it('should init SoundFontPlayerService', () => {
    soundFontPlayerService = new MockSoundFontPlayerService();
    let soundFontPlayerServiceSpy = spyOn(soundFontPlayerService, 'init');
    midiMessageRouterService = new MidiMessageRouterService(soundFontPlayerService);
    expect(soundFontPlayerServiceSpy).toHaveBeenCalled();
  });

  it('should forward message to SoundFontPlayerService', () => {
    soundFontPlayerService = new MockSoundFontPlayerService();
    midiMessageRouterService = new MidiMessageRouterService(soundFontPlayerService);
    let soundFontPlayerServiceSpy = spyOn(soundFontPlayerService, 'sendMidiMessage');
    let testMessage = {
      note: {
        name: 'C',
        octave: 1
      }
    };
    midiMessageRouterService.dispatchMidiMessage(testMessage);

    expect(soundFontPlayerServiceSpy).toHaveBeenCalledWith(testMessage);
  });
});
