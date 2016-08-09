import { Component, OnInit } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { Auth } from '../services/auth.service';
import { UserService } from '../services/home.service';


@Component({
  selector: 'home',
  providers: [UserService],
  template: `
  <h3>OMG I AM THE HOME!!</h3>
  <h1>Users: ({{users.isAvailble}})</h1>
    <ul>
      <li *ngFor="let user of users">
        {{user.username}}
      </li>
    </ul>
<div class="error" *ngIf="errorMessage">{{errorMessage}}</div>
  
  `
})
export class Home implements OnInit {
  // Selected observables to test async pipe model. 
  // Members to test subscribe model.
  private users = [];
  private errorMessage: string;

  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private userService: UserService
    ) {}
  ngOnInit() {
    this.getUsers();
  };

  getUsers() {
    this.userService.getUsers()
                    .subscribe(
                      data => this.users = data,
                      error =>  this.errorMessage = <any>error);
  }
}
