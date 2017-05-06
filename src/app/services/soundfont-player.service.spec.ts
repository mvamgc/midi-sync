import {SoundFontPlayerService} from './soundfont-player.service';
describe('soundFontPlayerService service', () => {
  let soundFontPlayerService: SoundFontPlayerService;
  beforeEach(() => {
    soundFontPlayerService = new SoundFontPlayerService();
  });

  it('should pass notes to piano if piano exists', () => {
    soundFontPlayerService.piano = {
      start: (noteStr: String) => {
        // do nothing
      }
    };

    const spy = spyOn(soundFontPlayerService.piano, 'start');
    expect(spy.calls.any()).toBe(false);
    soundFontPlayerService.sendMidiMessage({
      note: {
        name: 'C',
        octave: 4
      }
    });
    expect(spy.calls.any()).toBe(true);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledWith('C6');
  });
});
