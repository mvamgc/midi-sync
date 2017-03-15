import * as angular from 'angular';

import 'angular-ui-bootstrap';
import 'angular-animate';
import 'angular-touch';
import 'bootstrap';

import 'bootstrap/dist/css/bootstrap.css';

import {main} from './app/main.component';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.less';

export const app: string = 'app';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('app', main);
