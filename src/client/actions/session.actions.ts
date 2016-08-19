import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const SESSION_ACTIONS = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_ROLE: 'SET_ROLE',
  SET_SESSION_ID: 'SET_SESSION_ID',
  SET_SESSION_DATA: 'SET_SESSION_DATA'
};

@Injectable()
export class SessionActions {
  constructor(private ngRedux: NgRedux<any>) {}

  addMessageDispatch(messageObj) {
    const { message, from } = messageObj;
    this.ngRedux.dispatch(this.addMessage(message, from));
  }

  setRoleDispatch(role) {
    this.ngRedux.dispatch(this.setRole(role));
  }

  setSessionIDDispatch(sessionID) {
    this.ngRedux.dispatch(this.setSessionID(sessionID));
  }
  setSessionDataDispatch(data) {
    this.ngRedux.dispatch(this.setSessionData(data));
  }

  addMessage(message, from) {
    return {
      type: SESSION_ACTIONS.ADD_MESSAGE,
      message,
      from
    };
  }

  setRole(role) {
    return {
      type: SESSION_ACTIONS.SET_ROLE,
      role
    };
  }

  setSessionID(sessionID) {
    return {
      type: SESSION_ACTIONS.SET_SESSION_ID,
      sessionID
    };
  }
  setSessionData(data) {
    return {
      type: SESSION_ACTIONS.SET_SESSION_DATA,
      data
    };
  }
}
