import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { SocketService } from './socket.service';
import { TeacherActions } from '../actions';

@Injectable()
export class TeacherSocketService {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private socket: SocketService,
    private actions: TeacherActions
  ) { }

  init() {
    this.socket.onRequestedSession((session) => {
      this.actions.addSessionRequestDispatch(session);
    });

    this.socket.onStartedSession((data) => {
      console.log('on started session', data)
    });
  }

  acceptSession(session) {
    const teacherID = this.ngRedux.getState().login.userID;
    const studentID = session.student.userID;

    this.socket.acceptSession(teacherID, studentID);
  }
}
