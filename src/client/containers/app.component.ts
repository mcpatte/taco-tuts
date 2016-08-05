import { Component } from '@angular/core';
import { Router, RouterConfig, ROUTER_DIRECTIVES } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { AdvancedSearch } from '../components/advancedSearch.component';
import { SearchBar } from '../components/searchBar.component';
import { StudentDashboard } from '../components/studentDashboard.component';
import { Login } from '../components/login.component';
import { TeacherDashboard } from '../components/teacherDashboard.component';
import { MenuBar } from '../components/menuBar.component';
import { IAppState, rootReducer, enhancers } from '../store/index';
const createLogger = require('redux-logger');

@Component({
  selector: 'app',
  directives: [ SearchBar, StudentDashboard, MenuBar, Login, AdvancedSearch, ROUTER_DIRECTIVES ],
  pipes: [ AsyncPipe ],
  providers: [ DevToolsExtension ],
  template: `
  <h3>Here is the home page</h3>
  <h4>Welcome to taco tuts</h4>
  <menu-bar></menu-bar>
  <login></login>
  <student-dashboard></student-dashboard>
  <advanced-search-page></advanced-search-page>
    <nav>
      <a routerLink="/student-dash" routerLinkActive="active">Student Dash</a>
      <a routerLink="/login" routerLinkActive="active">Login</a>
      <a routerLink="/teacher-dash" routerLinkActive="active">Teacher Dashboard</a>
      <a routerLink="/advanced-search" routerLinkActive="active">Login</a>
    </nav>
  
  <router-outlet></router-outlet>
  `
})


export class App {
  constructor(
    public router: Router,
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension) {
      console.log('store')
    // Do this once in the top-level app component.
    this.ngRedux.configureStore(
      rootReducer,
      {},
      // [],
      [ createLogger() ],
      [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);
  }
}
