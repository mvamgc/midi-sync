import {module} from 'angular';

import routesConfig from '../routes';

export let app = module('app', ['ui.router', 'ui.bootstrap', 'ngTouch']).config(routesConfig);

import './main.component';
import './server-control.component';
import './sockjs-midi.service';
import './keyboard/midi-keys.component';
import './keyboard/midi-keys-octave.component';
