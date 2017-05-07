import {Component} from '@angular/core';

@Component({
  selector: 'app-settings',
  template: require('./app-settings.html')
})
export class AppSettings {
  public text: string;

  constructor() {
    this.text = 'App settings';
  }
}
