import {AppSettings} from './app-settings.component';
import {TestBed, async} from '@angular/core/testing';

describe('app-settings component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [AppSettings]});
    TestBed.compileComponents();
  }));

  it('should render...', () => {
    const fixture = TestBed.createComponent(AppSettings);
    fixture.detectChanges();
  });
});
