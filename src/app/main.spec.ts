import {MainComponent} from './main.component';
import {TestBed, async} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
// import {Octave} from './keyboard/octave.component';
// import {Keyboard} from './keyboard/keyboard.component';
import {MidiMessageRouterService} from './services/midi-message-router.service';

describe('main component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MainComponent], //, Keyboard, Octave
      providers: [
        {
          provide: MidiMessageRouterService, useValue: {}
        }
      ]
    });
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(MainComponent);
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('div.keybox'))).not.toBeNull();
  });
});
