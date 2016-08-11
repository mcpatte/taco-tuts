import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Auth } from '../services/auth.service';
import { UserService } from '../services/home.service';


@Component({
  selector: 'home',
  providers: [UserService],
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
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private userService: UserService
    ) {}
  ngOnInit() {
    this.getSubjects();
    this.getUsers();
  };

  getUsers() {
    this.userService.getUsers()
                    .subscribe(
                      data => this.users = data,
                      error =>  this.errorMessage = <any>error);
  }

  getSubjects() {
    this.userService.getSubjects()
                    .subscribe(
                      data => this.subjects = data,
                      error =>  this.errorMessage = <any>error);
  }

  getTeaching(subjectID) {
    console.log(subjectID);
    this.userService.getTeaching(subjectID)
                    .subscribe(
                      data => {
                      this.users = data;
                       console.log(data);},
                      error =>  this.errorMessage = <any>error);
  }
}
