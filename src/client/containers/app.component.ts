import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { NgRedux, DevToolsExtension } from 'ng2-redux';
import { AdvancedSearchComponent } from '../components/advancedSearch.component';
import { SearchBarComponent } from '../components/searchBar.component';
import { StudentDashboardComponent } from '../components/studentDashboard.component';
import { LoginComponent } from '../components/login.component';
import { MenuBarComponent } from '../components/menuBar.component';
import { IAppState } from '../store/index';
import { ConfigureStoreService } from '../services/configure-store.service.ts';
import { Auth } from '../services/auth.service';
import { SocketService } from '../services/socket.service';

@Component({
  selector: 'app',
  directives: [
    SearchBarComponent, StudentDashboardComponent, MenuBarComponent,
    LoginComponent, AdvancedSearchComponent, ROUTER_DIRECTIVES ],
  pipes: [ AsyncPipe ],
  providers: [ DevToolsExtension, ConfigureStoreService, Auth, SocketService ],
  template: `
  <div class='container-fluid'>
    <h4>Welcome to taco tuts</h4>
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
    private socket: SocketService
  ) {
    configureStore.configure(ngRedux);

    socket.connect('auth0|57ab5d3a10d863e85429247a');
  }
}
