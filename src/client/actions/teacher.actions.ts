import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

export const TEACHER_ACTIONS = {
  TOGGLE_AVAILABILITY: 'TOGGLE_AVAILABILITY',
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

  setRequestsDispatch(sessions) {
    this.ngRedux.dispatch(this.setRequests(sessions));
  }

  toggleAvailability() {
    return {
      type: TEACHER_ACTIONS.TOGGLE_AVAILABILITY,
    };
  }

  setRequests(sessions) {
    return {
      type:  TEACHER_ACTIONS.SET_SESSION_REQUESTS,
      sessions
    };
  }

  syncTeacherRequestsDispatch(authid) {
    return this.http.get('/api/instantsessions/teacher/' + authid)
      .map(res => res.json().data || {})
      .subscribe(requests => this.setRequestsDispatch(requests));
  }
}
