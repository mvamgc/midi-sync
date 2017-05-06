import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import { By }              from '@angular/platform-browser';
import { DebugElement }    from '@angular/core';

import {Octave} from './octave.component';
import {MidiMessageRouterService} from '../services/midi-message-router.service';
import {IMidiMessage} from '../services/MidiMessage';

describe('octave component', () => {
  beforeEach(async(() => {
    let midiMessageRouterStub = {
      lastMidiMessage: null,
      dispatchMidiMessage: function (midiMsg: IMidiMessage) {
        this.lastMidiMessage = midiMsg;
      }
    };
    TestBed.configureTestingModule({
      declarations: [Octave],
      providers: [{
        provide: MidiMessageRouterService, useValue: midiMessageRouterStub
      }]});
    TestBed.compileComponents();
  }));

  it('should has 5 black keys', () => {
    const fixture: ComponentFixture<Octave> = TestBed.createComponent(Octave);
    fixture.detectChanges();

    const octave: HTMLElement = fixture.nativeElement;
    expect(octave.querySelectorAll('span.black').length).toBe(5);
  });

  it('should has 7 white keys', () => {
    const fixture = TestBed.createComponent(Octave);
    fixture.detectChanges();

    const octave = fixture.nativeElement;
    expect(octave.querySelectorAll('span.white').length).toBe(7);
  });

  it('should play note E, octave 2', () => {
    const fixture = TestBed.createComponent(Octave);
    fixture.detectChanges();

    let comp = fixture.componentInstance;
    comp.octave = '2';
    let de = fixture.debugElement.query(By.css('span.key_e'));
    de.triggerEventHandler('click', null);
    let midiMessageRouterService = de.injector.get(MidiMessageRouterService);
    expect(midiMessageRouterService.lastMidiMessage).toEqual({
      note: {
        name: 'E',
        octave: 2
      }
    });
  });

  it('should play note E, octave 3', () => {
    const fixture = TestBed.createComponent(Octave);
    fixture.detectChanges();

    let comp = fixture.componentInstance;
    comp.octave = '3';
    let de = fixture.debugElement.query(By.css('span.key_e'));
    de.triggerEventHandler('click', null);
    let midiMessageRouterService = de.injector.get(MidiMessageRouterService);
    expect(midiMessageRouterService.lastMidiMessage).toEqual({
      note: {
        name: 'E',
        octave: 3
      }
    });
  });

  it('should play note D#, octave 4', () => {
    const fixture = TestBed.createComponent(Octave);
    fixture.detectChanges();

    let comp = fixture.componentInstance;
    comp.octave = '4';
    let de = fixture.debugElement.query(By.css('span.key_ds'));
    de.triggerEventHandler('click', null);
    let midiMessageRouterService = de.injector.get(MidiMessageRouterService);
    expect(midiMessageRouterService.lastMidiMessage).toEqual({
      note: {
        name: 'D#',
        octave: 4
      }
    });
  });

  it('should react on pressed key', () => {
    const fixture = TestBed.createComponent(Octave);
    fixture.detectChanges();

    let comp = fixture.componentInstance;
    comp.octave = '4';
    let de = fixture.debugElement.query(By.css('span.key_d'));
    de.triggerEventHandler('mousedown', null);
    expect(comp.isPressed('D')).toBeTruthy();
    expect(comp.isPressed('G')).toBeFalsy();
    de.triggerEventHandler('mouseup', null);
    expect(comp.isPressed('D')).toBeFalsy();
    expect(comp.isPressed('G')).toBeFalsy();
  });
});
