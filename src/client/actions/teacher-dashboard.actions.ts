import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const TEACHER_DASHBOARD_ACTIONS = {
  SET_AVAILABILITY: 'SET_AVAILABILITY'
};

@Injectable()
export class TeacherDashboardActions {
  constructor(private ngRedux: NgRedux<any>) {}

  setAvailabilityDispatch(value: boolean) {
    this.ngRedux.dispatch(this.setAvailability(value));
  }

  setAvailability(value: boolean) {
    return {
      type: TEACHER_DASHBOARD_ACTIONS.SET_AVAILABILITY,
      value
    };
  }
}
