import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/do';

export const SESSION_REQUEST_ACTIONS = {
  SET_REQUESTS: 'SET_REQUESTS',
  ADD_REQUEST: 'ADD_SESSION_REQUEST'
};

@Injectable()
export class SessionRequestActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private http: Http
  ) {}

  addRequestDispatch(studentAuthID, teacherAuthID, subjectID) {
    const body = { studentAuthID, teacherAuthID, subjectID };

    return this.http.post('/api/instantsessions/', body)
      .do(this.syncStudentRequestsDispatch);
  }

  addRequest(request) {
    return {
      type: SESSION_REQUEST_ACTIONS.ADD_REQUEST,
      request
    };
  }

  syncStudentRequestsDispatch() {
    const authid = this.ngRedux.getState().login.userData.authid;
    return this.http.get('/api/instantsessions/student/' + authid)
      .do(requests => this.setRequestsDispatch(requests));
  }

  setRequestsDispatch(requests) {
    console.log('got requests', { requests });
    this.ngRedux.dispatch(this.setRequests(requests));
  }

  setRequests(requests) {
    return {
      type: SESSION_REQUEST_ACTIONS.SET_REQUESTS,
      requests
    };
  }
}
