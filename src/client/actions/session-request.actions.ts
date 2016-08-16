import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const SESSION_REQUEST_ACTIONS = {
  SET_REQUESTS: 'SET_REQUESTS'
};

@Injectable()
export class SessionRequestActions {
  constructor(private ngRedux: NgRedux<any>) {}

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
