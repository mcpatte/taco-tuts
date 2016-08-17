import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

export const TEACHER_ACTIONS = {
  TOGGLE_AVAILABILITY: 'TOGGLE_AVAILABILITY',
  ADD_SESSION_REQUEST: 'ADD_SESSION_REQUEST',
  REMOVE_SESSION_REQUEST: 'REMOVE_SESSION_REQUEST',
  SET_SESSION_REQUESTS: 'SET_SESSION_REQUESTS'
};

@Injectable()
export class TeacherActions {
  private availabilityUrl: string = '/api/available/';

  constructor(
    private ngRedux: NgRedux<any>,
    private http: Http
  ) {}

  toggleAvailabilityDispatch() {
    const {
      login: { userID },
      teacher: { available }
    } = this.ngRedux.getState();

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const body = JSON.stringify({ availability: !available });

    this.http.post(this.availabilityUrl + userID, body, options)
      .subscribe(() => {
        this.ngRedux.dispatch(this.toggleAvailability());
      });
  }

  addSessionRequestDispatch(session) {
    this.ngRedux.dispatch(this.addSessionRequest(session));
  }

  removeSessionRequestDispatch(session) {
    this.ngRedux.dispatch(this.removeSessionRequest(session));
  }

  setSessionRequestsDispatch(sessions) {
    this.ngRedux.dispatch(this.setSessionRequests(sessions));
  }

  toggleAvailability() {
    return {
      type: TEACHER_ACTIONS.TOGGLE_AVAILABILITY,
    };
  }

  addSessionRequest(session) {
    return {
      type: TEACHER_ACTIONS.ADD_SESSION_REQUEST,
      session
    };
  }

  removeSessionRequest(session) {
    return {
      type: TEACHER_ACTIONS.REMOVE_SESSION_REQUEST,
      session
    };
  }

  setSessionRequests(sessions) {
    return {
      type:  TEACHER_ACTIONS.SET_SESSION_REQUESTS,
      sessions
    };
  }
}
