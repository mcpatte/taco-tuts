import { Component } from '@angular/core';
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
  directives: [ SearchBar, StudentDashboard, MenuBar, Login, AdvancedSearch ],
  pipes: [ AsyncPipe ],
  providers: [ DevToolsExtension ],
  template: `
  <h3>Here is the home page</h3>
  <h4>Welcome to taco tuts</h4>
  <menu-bar></menu-bar>
  <login></login>
  <student-dashboard></student-dashboard>
  <advanced-search-page></advanced-search-page>
  `
})
export class App {
  constructor(
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension) {
    // Do this once in the top-level app component.
    this.ngRedux.configureStore(
      rootReducer,
      {},
      // [],
      [ createLogger() ],
      [ ...enhancers, devTool.isEnabled() ? devTool.enhancer() : f => f]);
  }
}
