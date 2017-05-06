import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MidiMessageRouterService} from './services/midi-message-router.service';
// todo: migrate and uncomment
import {Octave} from './keyboard/octave.component';
// import {Keyboard} from './keyboard/keyboard.component';
import {MainComponent} from './main.component';
import {SoundFontPlayerService} from './services/soundfont-player.service';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    MainComponent, Octave // Keyboard
  ],
  providers: [MidiMessageRouterService, SoundFontPlayerService],
  bootstrap: [MainComponent]
})
export class AppModule {}
