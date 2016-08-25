import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SessionWidgetsComponent } from '../session-widgets/session-widgets.component';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store';
import { IMessageState } from '../../store/session.reducer';
import { SessionActions } from '../../actions';
import { SocketService } from '../../services/socket.service';
import { StateGetterService } from '../../services/state-getter.service';
import { Router } from '@angular/router';
import { VideoChatComponent } from '../video-chat/videoChat.component';
import { Button } from 'primeng/primeng';

@Component({
  selector: 'session',
  styles: [`
    .module {
  width: 300px;
  position: relative;
  left: 20;
  top: 0;
}

.discussion {
  list-style: none;
  background: white;
  margin: 0;
  padding: 0 0 5px 0;
}
.discussion li {
  padding: 0.5rem;
  overflow: hidden;
  display: flex;
}

.messages {
  background: snow;
  padding: 10px;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

  `],
  directives: [SessionWidgetsComponent, VideoChatComponent, Button],
  providers: [StateGetterService],
  template: require('./session.template.html')
})
export class SessionComponent {
  @select(['session', 'role']) role$: Observable<string>;
  @select(['session', 'messages']) messages$: Observable<IMessageState[]>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: SessionActions,
    private socket: SocketService,
    private state: StateGetterService,
    private router: Router
  ) {}

  isTeacher() {
    return this.state.isTeacher();
  }

  leaveSession() {
    this.socket.leaveSession(
      this.state.getSessionID(),
      this.state.getAuthID(),
      this.state.getUserName()
    );

    if (this.state.isTeacher()) {
      this.actions.leaveSessionDispatch();
      this.router.navigate(['/teacher-dash']);
    } else {
      this.router.navigate(['/session-end']);
    }
  }

  onKeypress(e) {
    if (e.charCode === 13) {
      // use role as the `from` message property as placeholder
      this.socket.sendSessionMessage(
        this.state.getSessionID(),
        e.target.value,
        this.state.getUserName()
      );

      e.target.value = '';
    }
  }
}
