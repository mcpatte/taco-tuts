import { Component }          from '@angular/core';
import { NgRedux }            from 'ng2-redux';
import { IAppState }          from '../store/index';
import { ROUTER_DIRECTIVES }  from '@angular/router';
import { Auth }               from '../services/auth.service';
import { LogoutActions }      from '../actions/logout.actions';


@Component({
  selector: 'menu-bar',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ LogoutActions ],
  template: `
  <nav>
    <a routerLink="/home" routerLinkActive="active">Home</a>
    <a routerLink="/student-dash" routerLinkActive="active" *ngIf="isAuthenticated()">Student Dashboard</a>
    <a routerLink="/teacher-dash" routerLinkActive="active" *ngIf="isTeacher()">Teacher Dashboard</a>
    <a routerLink="/advanced-search" routerLinkActive="active" >Advanced Search</a>
    <a routerLink="/login" routerLinkActive="active" *ngIf="!isAuthenticated()">Log In</a>
    <a routerLink="/session" routerLinkActive="active" *ngIf="isInSession()">Session</a>
    <a routerLink="#" routerLinkActive="active" (click)="logout()" *ngIf="isAuthenticated()">Log Out</a>
  </nav>
  `
})
export class MenuBarComponent {
  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private logoutActions: LogoutActions
  ) { }

  isAuthenticated() {
    //will return true if user is logged in
    return this.auth.isAuthenticated();
  }

  isTeacher() {
    if (this.ngRedux.getState()['login']['userData'] !== undefined) {
      return this.auth.isTeacher();
    }
    return false;
  }

  logout () {
    localStorage.clear();
    this.auth.logout();
    this.logoutActions.setLogoutDispatch();
  }

  isInSession() {
    return !!this.ngRedux.getState().session.sessionID;
  }
}
