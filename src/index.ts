import * as angular from 'angular';

import {main} from './app/main.component';
import 'angular-ui-router';
import routesConfig from './routes';

import './index.less';

export const app: string = 'app';

angular
  .module(app, ['ui.router'])
  .config(routesConfig)
  .component('app', main);
