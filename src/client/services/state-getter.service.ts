import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Injectable()
export class StateGetterService {
  constructor (
    private ngRedux: NgRedux<IAppState>
  ) {}

  private readState(path: string[]) {
    return path.reduce((result, prop) => result[prop], this.ngRedux.getState());
  }

  public getUserName() {
    return this.readState(['login', 'userData', 'name']);
  }

  public getAuthID() {
    return this.readState(['login', 'userData', 'authid']);
  }

  public getRole() {
    return this.readState(['session', 'role']);
  }

  public getSessionID() {
    return this.readState(['session', 'sessionID']);
  }
}
