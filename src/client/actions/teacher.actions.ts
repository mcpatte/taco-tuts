import { NgRedux } from 'ng2-redux';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

export const TEACHER_ACTIONS = {
  TOGGLE_AVAILABILITY: 'TOGGLE_AVAILABILITY'
};

@Injectable()
export class TeacherActions {
  private availabilityUrl: string = '/api/available/';

  constructor(
    private ngRedux: NgRedux<any>,
    private http: Http
  ) {}

  toggleAvailabilityDispatch() {
    const {
      login: { userID },
      teacher: { available }
    } = this.ngRedux.getState();

    const headers = new Headers({ 'Content-Type': 'application/json' });
    const options = new RequestOptions({ headers });
    const body = JSON.stringify({ availability: !available });

    this.http.post(this.availabilityUrl + userID, body, options)
      .subscribe(() => {
        this.ngRedux.dispatch(this.toggleAvailability());
      });
  }

  toggleAvailability() {
    return {
      type: TEACHER_ACTIONS.TOGGLE_AVAILABILITY,
    };
  }
}
