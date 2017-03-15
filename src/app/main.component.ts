import {app} from './app.module';
import {MidiService} from './midi.service';

export const main: angular.IComponentOptions = {
  template: require('./main.html'),
  /* @ngInject */
  controller: function (midiService: MidiService) { // eslint-disable-line babel/object-shorthand
    //
    midiService.connect();

  }
};

app.component('main', main);
