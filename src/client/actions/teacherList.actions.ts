import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const TEACHER_LIST_ACTIONS = {
  SET_LIST: 'SET_LIST'
};

@Injectable()
export class TeacherList {

  constructor(
    private ngRedux: NgRedux<any>
    ) {}

  public setTeacherListDispatch(list) {
    this.ngRedux.dispatch({
      type: TEACHER_LIST_ACTIONS.SET_LIST,
      list: list
    });
  }

};
