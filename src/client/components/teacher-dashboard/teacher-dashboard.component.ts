import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { TeacherDashboardActions } from '../../actions';

@Component({
  selector: 'teacher-dashboard',
  providers: [ TeacherDashboardActions ],
  template: require('./teacher-dashboard.template.html')
})
export class TeacherDashboardComponent {
  @select([
    'teacherDashboard',
    'available'
  ]) available$: Observable<boolean>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private actions: TeacherDashboardActions
  ) { }
}
/*
 <label for="subject" *ngIf="isTeacherSelected" >
   What subject do you teach?</label>
  <span tags ngControl='model.teachingSubjects'
  model='model.teachingSubjects'
  ng-change="model.teachingSubjects = " *ngIf="isTeacherSelected" ></span>
*/
