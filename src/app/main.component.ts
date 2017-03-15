import {app} from './app.module';
import {MidiService} from './midi.service';

export const main: angular.IComponentOptions = {
  template: require('./main.html'),
  /* @ngInject */
  controller: function (midiService: MidiService) { // eslint-disable-line babel/object-shorthand
    //
    midiService.connect().then(() => {
      console.log("Output[0]: %o", midiService.getOutputs()[0]);
    });

  }
};

app.component('main', main);
