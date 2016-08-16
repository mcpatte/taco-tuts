import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { AdvancedSearchComponent } from '../components/advanced-search';
import { SearchBarComponent } from '../components/searchBar.component';
import { StudentDashboardComponent } from '../components/student-dashboard/studentDashboard.component';
import { LoginComponent } from '../components/login.component';
import { MenuBarComponent } from '../components/menuBar.component';
import { IAppState } from '../store/index';
import { ConfigureStoreService } from '../services/configure-store.service.ts';
import { Auth } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { TeacherSocketService } from '../services/teacher-socket.service';
import { TeacherActions } from '../actions';

@Component({
  selector: 'app',
  directives: [
    SearchBarComponent, StudentDashboardComponent, MenuBarComponent,
    LoginComponent, AdvancedSearchComponent, ROUTER_DIRECTIVES ],
  pipes: [ AsyncPipe ],
  providers: [
    DevToolsExtension,
    ConfigureStoreService,
    Auth,
    SocketService,
    TeacherSocketService,
    TeacherActions
  ],
  template: `
  <div class='container-fluid'>
    <h4>Welcome to taco tuts</h4>
    <menu-bar></menu-bar>
    <router-outlet></router-outlet>
  </div>
  `
})

export class AppComponent {

  private initialized: boolean = false;

  constructor(
    private auth: Auth,
    public router: Router,
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private configureStore: ConfigureStoreService,
    private socket: SocketService,
    private teacherSocket: TeacherSocketService
  ) {
    configureStore.configure(ngRedux);

    ////// vvvvvv this is just placeholder stuff
    const userID = localStorage.getItem('authID');

    ngRedux.dispatch({
      type: 'SET_USER_ID',
      userID
    });

    socket.connect(userID);
    teacherSocket.init();
    ///// ^^^^^^ this is just placeholder stuff
  }

  ngOnInit() {
    this.setProfile();
  }

    setProfile() {
    if (this.auth.isAuthenticated()) {
      // this.initialized = true;
      if (this.getID().indexOf('google') !== -1) {
         this.auth.fetchAuth0Profile(this.getID(), function(profile) {
           this.auth.setProfile(this.getID(), profile);
         });
      }
    }
  }



  getID() {
    let currState = this.ngRedux.getState();
    if (currState.login.userData !== null) {
        return currState.login['userData'].authid;
    }
    return undefined;
  }




}
