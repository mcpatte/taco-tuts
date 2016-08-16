import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const SESSION_REQUEST_ACTIONS = {
  ADD_REQUEST: 'ADD_REQUEST',
  REMOVE_REQUEST: 'REMOVE_REQUEST',
  CLEAR_REQUESTS: 'CLEAR_REQUESTS'
};

@Injectable()
export class SessionRequestActions {
  constructor(private ngRedux: NgRedux<any>) {}

  addRequestDispatch(teacherID) {
    this.ngRedux.dispatch(this.addRequest(teacherID));
  }

  removeRequestDispatch(teacherID) {
    this.ngRedux.dispatch(this.removeRequest(teacherID));
  }

  clearRequestsDispatch() {
    this.ngRedux.dispatch(this.clearRequests());
  }

  addRequest(teacherID) {
    return {
      type: SESSION_REQUEST_ACTIONS.ADD_REQUEST,
      teacherID
    };
  }

  removeRequest(teacherID) {
    return {
      type: SESSION_REQUEST_ACTIONS.REMOVE_REQUEST,
      teacherID
    };
  }

  clearRequests() {
    return {
      type: SESSION_REQUEST_ACTIONS.CLEAR_REQUESTS
    };
  }
}
