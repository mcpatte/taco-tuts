import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

export const TEACHER_LIST_ACTIONS = {
  SET_LIST: 'SET_LIST',
  SET_TEACHER: 'SET_TEACHER'
};

@Injectable()
export class TeacherListActions {

  constructor(
    private ngRedux: NgRedux<any>,
    private http: Http
    ) {}

  public setTeacherListDispatch(list) {
    this.ngRedux.dispatch({
      type: TEACHER_LIST_ACTIONS.SET_LIST,
      list: list
    });
  }
  public selectedTeacherDispatch(authID: string) {
    console.log("selected teacher dispatch")
    return this.getProfile(authID)
      .do (        
        profile => {
          this.ngRedux.dispatch({
            type: TEACHER_LIST_ACTIONS.SET_TEACHER,
            teacher: profile
          })
        }
      )
  }
  public getProfile(authID) {
    return this.http.get('/api/teachers/' + authID)
      .map(this.extractData)
  }
  private extractData(res) {
    let body = res.json();
    return body.data || { };
  }
};
