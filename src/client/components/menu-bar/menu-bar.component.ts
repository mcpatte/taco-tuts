import { Component }          from '@angular/core';
import { NgRedux }            from 'ng2-redux';
import { IAppState }          from '../../store/index';
import { ROUTER_DIRECTIVES, Router }  from '@angular/router';
import { Auth }               from '../../services/auth.service';
import { LogoutActions }      from '../../actions/logout.actions';
import { StateGetterService } from '../../services/state-getter.service';

@Component({
  selector: 'menu-bar',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ LogoutActions ],
  styles: [`
    .menu {
      background-color: #33495f;
      width: 100%;
      height: 150px;
      font-size: 1.3em;
      color: #ffffff;
      padding:0;
      margin:0;
    }
    .menuItem {
      background-color: #33495f;
      height: 45px;
      border-top-right-radius: 5px;
      border-top-left-radius: 5px;
      border: none;
      margin: 105px 3px 0px 3px;
      color: #ffffff;
      float: right;
      font-family: 'Roboto';
      position: relative;

    }
    .menuItem a {
      text-decoration: none;
      color: #ffffff;
    }
    .menuItemActive {
      background-color: #ffffff;
      text-decoration: none;
    }
    .menuItemActive a{
      color: #33495f !important;
    }
    .menuItem:hover{
      background-color: white;
      border: none;
      text-decoration: none;
    }
    .menuItem:hover a{
      color: #f58a2e;
    }
    .logo {
      font-family: 'Roboto';
      max-width: 100px;
    }
    .logoImg {
      max-height: 133px;
      max-width: 200px;
      border-radius: 0px;
      position: absolute;
      margin-left: -30px;
      margin-top: 15;
    }
    .logo-text {
      font-family: 'Roboto';
      max-width: 100px;
      margin-left: 120px;
    }

  `],
  template: require('./menu-bar.template.html')
})
export class MenuBarComponent {
  constructor(
    private auth: Auth,
    private ngRedux: NgRedux<IAppState>,
    private logoutActions: LogoutActions,
    private router: Router,
    private state: StateGetterService
  ) { }

  isAuthenticated() {
    return this.auth.isAuthenticated();
  }

  isTeacher() {
    if (this.isAuthenticated()){
      return this.state.isTeacher();
    }
  }

  logout () {
    localStorage.removeItem('id_token');
    this.auth.logout();
    this.logoutActions.setLogoutDispatch();
    this.navigate('/home');
  }

  isInSession() {
    return !!this.ngRedux.getState().session.sessionID;
  }

  navigate(path) {
    this.router.navigate([path]);
  }
}
