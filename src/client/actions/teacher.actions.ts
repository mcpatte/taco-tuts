import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';

export const TEACHER_ACTIONS = {
  TOGGLE_AVAILABILITY: 'TOGGLE_AVAILABILITY'
};

@Injectable()
export class TeacherActions {
  constructor(private ngRedux: NgRedux<any>) {}

  toggleAvailabilityDispatch() {
    this.ngRedux.dispatch(this.toggleAvailability());
  }

  toggleAvailability() {
    return {
      type: TEACHER_ACTIONS.TOGGLE_AVAILABILITY,
    };
  }
}
