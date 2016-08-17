//Should have username and password fields
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import { IAppState } from '../../store/index';
import { Auth } from '../../services/auth.service';
import { Router,
         ROUTER_DIRECTIVES }    from '@angular/router';
import { LoginActions } from '../../actions/login.actions';
import { UserService }    from '../../services/user.service';


@Component({
  selector: 'log-in',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ LoginActions, UserService ],
  styles: [`
    a {
      color: white;
    }
  `],
  template: require('./login.template.html')
})
export class LoginComponent {

  @select() userID$: Observable<string>;

  userID: string;

  constructor(
    private auth: Auth,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private loginActions: LoginActions,
    private userService: UserService

    ) { }

  login(username, password) {
    this.auth.login(username, password, function(result){
        localStorage.setItem('id_token', result.idToken);
        localStorage.setItem('authID', result.idTokenPayload.sub);
        let userID = result.idTokenPayload.sub;
        //will set auth to state
        this.auth.getUserFromDB(userID)
          .subscribe (
            response => {
              this.loginActions.setAuthDispatch(response[0].authID, response[0].email);
              this.loginActions.setDataDispatch(response[0]);
            }
          );
        this.goToHome();
    }.bind(this));
  }

  googleLogin () {
    this.auth.googleLogin();
  }

  goToSignup() {
    this.router.navigate(['/sign-up']);
  }

  goToHome() {
    this.router.navigate(['/home']);
  }
}
