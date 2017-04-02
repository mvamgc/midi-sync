import {app} from '../app.module';

class KeysController {

}

export const keys: angular.IComponentOptions = {
  template: require('./midi-keys.html'),
  controller: KeysController
};

app.component('midiKeys', keys);
