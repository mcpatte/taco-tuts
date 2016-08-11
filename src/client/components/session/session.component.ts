import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionWidgetsComponent } from '../session-widgets/session-widgets.component';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { IMessageState } from '../../store/session.reducer';

@Component({
  selector: 'session',
  directives: [SessionWidgetsComponent],
  template: require('./session.template.html')
})
export class SessionComponent {
  @select(['session', 'role']) role$: Observable<string>;
  @select(['session', 'messages']) messages$: Observable<IMessageState[]>;

  constructor(
    private ngRedux: NgRedux<IAppState>
  ) { }

  isTeacher() {
    return this.ngRedux.getState().session.role === 'teacher';
  }

  onKeypress(event) {
    console.log(event);
  }
}
