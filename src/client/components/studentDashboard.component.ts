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
import { Auth } from '../services/auth.service';

@Component({
  selector: 'student-dashboard',
  template: `
  <h3>OMG I AM THE STUDENT DASHBOARD!</h3>
    
  `
})
export class StudentDashboard {
  // Selected observables to test async pipe model.
  
  // Members to test subscribe model.

  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>) { }


}
