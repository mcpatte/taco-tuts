import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/do';

export const SESSION_REQUEST_ACTIONS = {
  SET_REQUESTS: 'SET_REQUESTS'
};

@Injectable()
export class SessionRequestActions {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private http: Http
  ) {}

  addRequestDispatch(studentID, teacherID, subjectID) {
    const body = { studentID, teacherID, subjectID };

    return this.http.post('/api/instantsessions', body)
      .subscribe(() => this.syncStudentRequestsDispatch(studentID));
  }

  cancelRequestDispatch(studentID, teacherID) {
    return this.http.delete(`/api/instantsessions/${studentID}/${teacherID}`)
      .subscribe(() => this.syncStudentRequestsDispatch(studentID));
  }

  cancelAllRequestsDispatch(studentID) {
    return this.http.delete('/api/instantsessions/' + studentID)
      .do(() => this.syncStudentRequestsDispatch(studentID));
  }

  syncStudentRequestsDispatch(authid) {
    return this.http.get('/api/instantsessions/student/' + authid)
      .map(res => res.json().data || {})
      .subscribe(requests => this.setRequestsDispatch(requests));
  }

  syncTeacherRequestsDispatch(authid) {
    return this.http.get('/api/instantsessions/teacher/' + authid)
      .map(res => res.json().data || {})
      .subscribe(requests => this.setRequestsDispatch(requests));
  }

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
