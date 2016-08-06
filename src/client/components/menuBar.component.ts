import { Component } from '@angular/core';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { IAppState, rootReducer, enhancers } from '../store/index';
import { Router, RouterConfig, ROUTER_DIRECTIVES } from '@angular/router';
import { Login } from '../components/login.component';
import { StudentDashboard } from '../components/studentDashboard.component';
import { TeacherDashboard } from '../components/teacherDashboard.component';
import { AdvancedSearch } from '../components/advancedSearch.component';

@Component({
  selector: 'menu-bar',
  directives: [ StudentDashboard, Login, AdvancedSearch, TeacherDashboard, ROUTER_DIRECTIVES ],
  template: `
  <nav>
    <a routerLink="/login" routerLinkActive="active">Login</a>
    <a routerLink="/student-dash" routerLinkActive="active">Student Dashboard</a>
    <a routerLink="/teacher-dash" routerLinkActive="active">Teacher Dashboard</a>
    <a routerLink="/advanced-search" routerLinkActive="active">Advanced Search</a>
  </nav>
  `
})
export class MenuBar {
  constructor(    
    private ngRedux: NgRedux<IAppState>
    ) { }
}