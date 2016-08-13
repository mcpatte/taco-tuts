import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Auth } from '../services/auth.service';
import { HomeService } from '../services/home.service';
import { UserService } from '../services/user.service';
import { LoginActions } from '../actions/login.actions';


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
    private loginActions: LoginActions
    ) {}
  ngOnInit() {
    console.log("Home initializing")
    this.getSubjects();
    this.getUsers();
    setTimeout(function(){
      this.getProfile();
    }.bind(this), 2000)


  };

  getProfile() {
      console.log("local storage", JSON.stringify(localStorage.getItem('userData')))
      // if (JSON.parse(localStorage.getItem('profile')).user_id.indexOf('google')){
      //   console.log("HEEELLOOOOO???------------------------");
      //   console.log("SO ya logged in with google, eh?");
      //   //this.auth.
      //   let userID = JSON.parse(localStorage.getItem('profile')).user_id;
      //   console.log("I have this userID?", JSON.parse(localStorage.getItem('profile')).user_id);
      //   console.log("I am sending this user id: " + userID + " Into getUserData");
      //   return this.userService.getUserData(userID)
      //     .subscribe(
      //       response => console.log("userdata", response)
      //     )
      // } else {
      let userID: string = this.ngRedux.getState()['login']['userID'];
      this.userService.getUserData(userID)
        .subscribe(
          (userData) => {
            console.log("user data", userData)
            this.loginActions.setDataDispatch(userData[0]);
          }
        );
   // }
  }
  

  getUsers() {
    this.homeService.getUsers()
      .subscribe(
        data => this.users = data,
        error =>  this.errorMessage = <any>error);
  }

  getSubjects() {
    this.homeService.getSubjects()
      .subscribe(
        data => this.subjects = data,
        error =>  this.errorMessage = <any>error);
  }

  getTeaching(subjectID) {
    console.log(subjectID);
    this.homeService.getTeaching(subjectID)
        .subscribe(
          data => {
            this.users = data;
            console.log(data);
          },
          error =>  this.errorMessage = <any>error);
  }
}
