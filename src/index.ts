// import * as angular from 'angular';
import {module} from 'angular';


import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-touch';
import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

import {main} from './app/main.component';
import {MidiService} from './app/midi.service';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.less';

// export const app: string = 'app';

export let app = module('app', ['ui.router'])
  .config(routesConfig)
  .component('app', main);
