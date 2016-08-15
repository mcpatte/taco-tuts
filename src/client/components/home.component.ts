import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Auth } from '../services/auth.service';
import { HomeService } from '../services/home.service';
import { UserService } from '../services/user.service';
import { LoginActions } from '../actions/login.actions';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'home',
  providers: [ HomeService, LoginActions, UserService],
  template: `
  <h3>Filter teachers by subject</h3>
  <table>
    <tr>
    Subjects:
        <td *ngFor="let subject of subjects">
          <button (click)="getUsers(subject.id)">
            {{subject.name}}
          </button>
        </td>
    </tr>
  </table>
    <div *ngFor="let user of users">
      <ul *ngIf="user.teacherID">
        {{getTeacher(user.teacherID)}}
        <div *ngFor="let teacher of teachers">
        <li *ngIf="teacher.isavailible === true && teacher.teacher === true">
          {{teacher.name}}
          <button (click)="requestSession(teacher)">
            request session
          </button>
        </li>
        </div>
      </ul>
    </div>
<div class="error" *ngIf="errorMessage">{{errorMessage}}</div>

  `
})
export class HomeComponent implements OnInit {
  // Selected observables to test async pipe model.
  // Members to test subscribe model.
  private users = [];
  private subjects = [];
  private errorMessage: string;
  private teachers = [];

  constructor(
    private userService: UserService,
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private homeService: HomeService,
    private loginActions: LoginActions,
    private socket: SocketService
  ) {}

  ngOnInit() {
    this.getSubjects();
    this.getUsers();
    this.setProfile();
    this.getTeacher(1);
  };
  
  getUsers() {
    this.homeService.getUsers()
      .subscribe(
        data => this.users = data,
        error =>  this.errorMessage = <any>error
      );
  }
  getSubjects() {
    this.homeService.getSubjects()
      .subscribe(
        data => this.subjects = data,
        error =>  this.errorMessage = <any>error
      );
  }
  getTeaching(subjectID) {
    console.log(subjectID);
    this.homeService.getTeaching(subjectID)
      .subscribe(
        data => {
          this.users = data;
          console.log(data);
        },
        error =>  this.errorMessage = <any>error
      );
  }

  requestSession(teacher) {
    const teacherID = teacher.authid;

    const student = {
      // TODO: replace with method on auth service
      userID: this.ngRedux.getState().login.userData.authid,
      name: 'harambe'
    };
    this.socket.requestSession(teacherID, student);
  }

  getTeacher(teacherID) {
    console.log(teacherID);
    this.homeService.getTeacher(teacherID)
      .subscribe(
        data => {
          this.teachers = data;
          console.log(data);
        },
        error => this.errorMessage = <any>error
      );
  }
}
