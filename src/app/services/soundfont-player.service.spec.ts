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

  it('should ignores notes if piano does not exist', () => {
    soundFontPlayerService.piano = undefined;
    soundFontPlayerService.sendMidiMessage({
      note: {
        name: 'C',
        octave: 4
      }
    });
  });

  it('should init', () => {
    if (typeof AudioContext === 'undefined') {
      soundFontPlayerService.audioContext = <AudioContext> {};
      expect(soundFontPlayerService.initializing).toBe(false);
      soundFontPlayerService.soundfont = {
        instrument: () => {
          expect(soundFontPlayerService.initializing).toBe(true);
          return Promise.resolve({marker: 'Piano object mock'});
        }
      };
    }
    soundFontPlayerService.init().then(() => {
      console.log('checking M');
      expect(soundFontPlayerService.piano.marker).toEqual('Piano object mock');
    });
  });

  it('should not init without audio context', (done) => {
    if (typeof AudioContext === 'undefined') {
      soundFontPlayerService.audioContext = null;
      expect(soundFontPlayerService.initializing).toBe(false);
      soundFontPlayerService.soundfont = {
        instrument: () => {
          expect(soundFontPlayerService.initializing).toBe(true);
          return Promise.resolve({marker: 'Piano object mock'});
        }
      };
    }
    soundFontPlayerService.init().then(
      () => fail('should fail without AC'),
      () => {
        console.log('checking M');
        expect(soundFontPlayerService.piano).not.toBeDefined;
        done();
    });
    // fail('make sure it reject the init');
  });
});
