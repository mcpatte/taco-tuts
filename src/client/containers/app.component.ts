import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { MenuBarComponent } from '../components/menu-bar';
import { IAppState } from '../store/index';
import { ConfigureStoreService } from '../services/configure-store.service.ts';
import { Auth } from '../services/auth.service';
import { SocketService } from '../services/socket.service';
import { TeacherSocketService } from '../services/teacher-socket.service';
import { TeacherActions, LoginActions } from '../actions';

@Component({
  selector: 'app',
  directives: [ROUTER_DIRECTIVES, MenuBarComponent],
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
    <menu-bar></menu-bar>
    <router-outlet></router-outlet>
  </div>
  `
})

export class AppComponent {
  constructor(
    private auth: Auth,
    public router: Router,
    private ngRedux: NgRedux<IAppState>,
    private devTool: DevToolsExtension,
    private configureStore: ConfigureStoreService,
    private socket: SocketService,
    private teacherSocket: TeacherSocketService,
    private loginActions: LoginActions
  ) {
    configureStore.configure(ngRedux);

    auth.userData$.subscribe(this.onNewUserData.bind(this));
  }

  onNewUserData(userData) {
    this.loginActions.setDataDispatch(userData);

    this.socket.connect(userData.authid);
  }

  getID() {
    let currState = this.ngRedux.getState();
    if (currState.login.userData !== null) {
      return currState.login['userData'].authid;
    }
    return undefined;
  }




}
