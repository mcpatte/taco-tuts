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



  /*
    <input (click)="showStudentSubjects()" [(ngModel)]="model.student" type="checkbox" class="form-control" required />
            <label *ngIf="isStudentSelected" for="subject">What subject(s) do you want to learn?</label>
             <span tags (ngModelChange)="updateLearning($event)" *ngIf="isStudentSelected"></span>

          <div class="form-group">
            <label for="student">Student</label>
            <input [(ngModel)]="model.student" type="checkbox" class="form-control" />
          </div>
          <div class="form-group">
            <label for="teacher">Teacher</label>
            <input [(ngModel)]="model.teacher" type="checkbox" class="form-control" />
          </div>

             */
