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
    button {
      color: #33495f;
      height: 50px;
      width: 50%;
    }
    button:hover {
      color: #ff9f4f;
      background-color: white;
      cursor: pointer;
    }
    .google {
      max-height: 25px;
    }
    h1 {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;
      text-align: center;    
    }
    h4 {
      font-family: 'Roboto', sans-serif;
      color: #33495f;
      padding: 10px 0;
    }
    h5 {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;    
    }
    label {
      font-family: 'Roboto', sans-serif;
      color: #ff9f4f;
      text-align: left;
      font-weight: 800;
    }
    .log-in {
      max-width: 400px;
      padding-bottom: 25px;
    }
    .sign-up {
      background-color: #ff9f4f;
      width: 75%;
      color: white;
      border: 0;
    }
    .sign-up:hover{
      color: #ff9f4f;
      border: 1px solid #33495f;
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
