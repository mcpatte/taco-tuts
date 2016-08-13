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
          <button (click)="getTeaching(subject.id)">
            {{subject.name}}
          </button>
        </td>
    </tr>
  </table>
    <div>
      <ul *ngFor="let user of users">
        <li *ngIf="user.isavailible === true && user.teacher === true">
          {{user.name}}
          <button (click)="requestSession(user)">
            request session
          </button>
        </li>
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
    // need to put logged in user's data here
    const teacherID = teacher.authid;

    const student = {
      userID: this.ngRedux.getState().login.userID,
      name: 'harambe'
    };

    this.socket.requestSession(teacherID, student);
  }
}
