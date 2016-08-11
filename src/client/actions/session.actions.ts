import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const SESSION_ACTIONS = {
  ADD_MESSAGE: 'ADD_MESSAGE',
  SET_ROLE: 'SET_ROLE'
};

@Injectable()
export class SessionActions {
  constructor(private ngRedux: NgRedux<any>) {}

  addMessageDispatch(message, from) {
    this.ngRedux.dispatch(this.addMessage(message, from));
  }

  setRoleDispatch(role) {
    this.ngRedux.dispatch(this.setRole(role));
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
}
