import { Component } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '../store/index';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Login } from '../components/login.component';
import { StudentDashboard } from '../components/studentDashboard.component';
import { TeacherDashboard } from '../components/teacherDashboard.component';
import { AdvancedSearch } from '../components/advancedSearch.component';
import { Auth } from '../services/auth.service';

@Component({
  selector: 'menu-bar',
  directives: [ Login, StudentDashboard, TeacherDashboard, AdvancedSearch, ROUTER_DIRECTIVES ],
  providers: [Auth],
  template: `
  <nav>
    <a routerLink="/login" routerLinkActive="active">Login</a>
    <a routerLink="/student-dash" routerLinkActive="active">Student Dashboard</a>
    <a routerLink="/teacher-dash" routerLinkActive="active">Teacher Dashboard</a>
    <a routerLink="/advanced-search" routerLinkActive="active">Advanced Search</a>
    <a routerLink="#" routerLinkActive="active" (click)="auth.login()" *ngIf="!auth.authenticated()">Log In</a>
    <a routerLink="#" routerLinkActive="active" (click)="auth.logout()" *ngIf="auth.authenticated()">Log Out</a>
  </nav>
  `
})
export class MenuBarComponent {
  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>
    ) { }
}
