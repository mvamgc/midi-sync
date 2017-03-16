import {module} from 'angular';

import routesConfig from '../routes';

export let app = module('app', ['ui.router', 'ui.bootstrap']).config(routesConfig);

import './main.component';