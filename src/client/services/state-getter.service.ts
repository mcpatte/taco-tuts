import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';

@Injectable()
export class StateGetterService {
  constructor (
    private ngRedux: NgRedux<IAppState>
  ) {}

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

  public getAvailability() {
    return this.readState(['teacher', 'available']);
  }
  public getSessionTeacherID() {
    return this.readState(['session', 'teacherID']);
  }
  public getSessionStudentID() {
    return this.readState(['session', 'studentID']);
  }
  private readState(path: string[]) {
    return path.reduce((result, prop) => result[prop], this.ngRedux.getState());
  }
}
