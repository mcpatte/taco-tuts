import { Component } from '@angular/core';
import { SessionWidgetsComponent } from '../session-widgets/session-widgets.component';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';

@Component({
  selector: 'session',
  directives: [SessionWidgetsComponent],
  template: require('./session.template.html')
})
export class SessionComponent {
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }
}
