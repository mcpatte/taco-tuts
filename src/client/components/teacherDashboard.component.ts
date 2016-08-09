//this will render the search bar
//needs logo
//*needs menu bar
//*show upcoming sessions
//show calendar
//show messages
//this will render the search bar
//needs logo
//*needs menu bar
//show goals
//show calendar
//*show upcoming sessions
//show messages
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';

@Component({
  selector: 'teacher-dashboard',
  providers: [ ],
  template: `
  <h3>OMG I AM THE TEACHER DASHBOARD!</h3>

  `
})
export class TeacherDashboard {
  // Selected observables to test async pipe model.

  // Members to test subscribe model.

  constructor(
    private ngRedux: NgRedux<IAppState>) { }


}


 // <label for="subject" *ngIf="isTeacherSelected" >
 //   What subject do you teach?</label>
 //  <span tags ngControl='model.teachingSubjects' model='model.teachingSubjects' ng-change="model.teachingSubjects = " *ngIf="isTeacherSelected" ></span>