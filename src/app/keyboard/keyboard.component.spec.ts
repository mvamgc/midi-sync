import {Keyboard} from './keyboard.component';
import {TestBed, async} from '@angular/core/testing';
import {Octave} from './octave.component';
import {MidiMessageRouterService} from '../services/midi-message-router.service';
import {By} from '@angular/platform-browser';
import {IMidiMessage} from '../services/MidiMessage';

describe('keyboard component', () => {
  beforeEach(async(() => {
    let midiMessageRouterStub = {
      lastMidiMessage: null,
      dispatchMidiMessage: function (midiMsg: IMidiMessage) {
        this.lastMidiMessage = midiMsg;
      }
    };

    TestBed.configureTestingModule({
      declarations: [Keyboard, Octave],
      providers: [{
        provide: MidiMessageRouterService,
        useValue: midiMessageRouterStub
      }]});
    TestBed.compileComponents();
  }));

  it('should render 7 octaves', () => {
    const fixture = TestBed.createComponent(Keyboard);
    fixture.detectChanges();

    const keyboard: HTMLElement = fixture.nativeElement;
    expect(keyboard.querySelectorAll('span.white').length).toBe(7 * 7);
  });

  it('should play C2', () => {
    const fixture = TestBed.createComponent(Keyboard);
    fixture.detectChanges();

    const c3El = fixture.debugElement.queryAll(By.css('span.key_c'))[3]; // octaves starts from -1
    c3El.triggerEventHandler('click', null);
    let midiMessageRouterService = c3El.injector.get(MidiMessageRouterService);
    expect(midiMessageRouterService.lastMidiMessage).toEqual({
      note: {
        name: 'C',
        octave: 2
      }
    });
  });
});
