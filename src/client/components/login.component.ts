//Should have username and password fields
import { Component } from '@angular/core';
import { NgRedux, select } from 'ng2-redux';
import { Observable } from 'rxjs/Rx';
import { IAppState } from '../store/index';
import { Auth } from '../services/auth.service';
import { Router,
         ROUTER_DIRECTIVES }    from '@angular/router';
import { LoginActions } from '../actions/login.actions';
import { UserService }    from '../services/user.service';


@Component({
  selector: 'log-in',
  directives: [ ROUTER_DIRECTIVES ],
  providers: [ LoginActions, UserService ],
  styles: [`
    a {
      color: white;
    }
  `],
  template: `
    <div>
        <div class="row">
          <div class="col-md-6">
            <form>
              <div class="form-group">
                <label for="name">Username</label>
                <input type="text" class="form-control" #username placeholder="yours@example.com">
              </div>
              <div class="form-group">
                <label for="name">Password</label>
                <input type="password" class="form-control" #password placeholder="your password">
              </div>
              <button type="submit" class="btn btn-default" (click)="login(username.value, password.value)">Login</button>
               <button type="submit" class="btn btn-default btn-primary" (click)="googleLogin(username.value)">Login with google</button>
              <h4>Don't have an account yet?</h4>
            </form>
            <button type="submit" class="btn btn-default btn-primary">
              <a routerLink="/sign-up" routerLinkActive="active">Sign Up</a>
            </button>
          </div>
        </div>
      </div>
  `
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
