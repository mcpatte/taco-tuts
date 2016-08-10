import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Auth } from '../services/auth.service';
import { Http, Headers, Response } from '@angular/http';
import { StudentDashboardService } from '../services/studentDashboard.service.ts';
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'student-dashboard',
  providers: [StudentDashboardService],
  styles: [`
    .subject {
      background-color: lightblue;
    }
  `],
  template: require('./studentDashboard.component.html')
})
export class StudentDashboardComponent {
  date2 = '2016-08-09';
  subjects = [];
  studentID = ''

@select() userID$: Observable<string>;
  userID: string;

  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private studentDashboardService: StudentDashboardService) {
      this.userID$.subscribe(
        userID => this.studentID = userID 
      )
     }

    // getSubjects() {
    // this.studentDashboardService.getSubjects()  
    //   .subscribe(
    //     data => this.subjects = data
    //   )
    //  }
    
    getSubjectByStudent() {
      console.log("user id from state", this.studentID)
      this.studentDashboardService.findSubjectsByUser(this.studentID)
        .subscribe(
          data => this.subjects = data
        )
    }

    deleteStudentSubject(id) {
      console.log('delete')
      this.studentDashboardService.deleteStudentSubject(this.studentID, id)
    }
    


     showDate(date) {
       console.log(date);
     }

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
