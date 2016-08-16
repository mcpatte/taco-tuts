import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

export const SESSION_REQUEST_ACTIONS = {
  SET_REQUESTS: 'SET_REQUESTS'
};

@Injectable()
export class SessionRequestActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private http: Http
  ) {}

  setRequestsDispatch(requests) {
    this.ngRedux.dispatch(this.setRequests(requests));
  }

  setRequests(requests) {
    return {
      type: SESSION_REQUEST_ACTIONS.SET_REQUESTS,
      requests
    };
  }
}
