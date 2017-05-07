import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MidiMessageRouterService} from './services/midi-message-router.service';
import {Octave} from './keyboard/octave.component';
import {Keyboard} from './keyboard/keyboard.component';
import {MainComponent} from './main.component';
import {SoundFontPlayerService} from './services/soundfont-player.service';
import {AppSettings} from './app-settings.component';

@NgModule({
  imports: [
    BrowserModule,
  ],
  declarations: [
    MainComponent, Octave, Keyboard, AppSettings
  ],
  providers: [MidiMessageRouterService, SoundFontPlayerService],
  bootstrap: [MainComponent]
})
export class AppModule {}
