import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../../store/index';
import { Auth } from '../../services/auth.service';
import { StudentDashboardService } from '../../services/studentDashboard.service.ts';
import { Observable } from 'rxjs/Observable';
import { ProfileComponent } from '../profile/profile.component'; 
import { AppointmentComponent } from '../appointments/appointment.component';

@Component({
  selector: 'student-dashboard',
  providers: [ StudentDashboardService ],
  directives: [ProfileComponent, AppointmentComponent],
  styles: [`
    .subject {
      background-color: lightblue;
      width: 40%;
      margin: 5px;
      padding: 5px;
    }
  `],
  template: require('./studentDashboard.component.html')
})
export class StudentDashboardComponent {
  date2 = '2016-08-09';
  subjects = [];
  studentID: string;



@select(['login', 'userID']) userID$: Observable<string>;
  userID: string;

  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private studentDashboardService: StudentDashboardService) {
      this.userID$.subscribe(
        userID => this.studentID = userID
      );
     }


    ngOnInit() {
    this.getSubjectByStudent();
    this.getState();
    };
    

    getSubjectByStudent() {
      this.studentDashboardService.findSubjectsByUser(this.studentID)
        .subscribe(
          data => this.subjects = data
        );
    }

    deleteStudentSubject(subjectid, index) {
      this.subjects.splice(index, 1);
      this.studentDashboardService.deleteStudentSubject(this.studentID, subjectid)
        .subscribe(
          response => console.log(response)
        );
    }


    getState(){
     console.log(this.ngRedux.getState())
    }    

}
