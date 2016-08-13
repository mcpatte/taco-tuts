import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { NgRedux }         from 'ng2-redux';
import { AUTH_VARS }       from '../auth0.variables.ts';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { LoginActions } from '../actions/login.actions';


// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;

const AUTH0_CLIENT_ID = process.env.AUTH0_CLIENT_ID || AUTH_VARS.AUTH0_CLIENT_ID;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN || AUTH_VARS.AUTH0_DOMAIN;

@Injectable()
export class Auth {
  // Configure Auth0
  auth0 = new Auth0({
    domain: AUTH_VARS.AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    callbackOnLocationHash: true,
    callbackURL: process.env.AUTH0_CALLBACK_URL || window.location.origin
  });

  // Configure Auth0Lock
  lock = new Auth0Lock(
    AUTH0_CLIENT_ID,
    AUTH0_DOMAIN
  );

  constructor(
    private router: Router,
    private ngRedux: NgRedux<any>,
    private http: Http,
    private loginActions: LoginActions
  ) {
      var result = this.auth0.parseHash(window.location.hash);
      if (result && result.idToken) {
        // this is the user's specific id
        let id_token = result.idToken;
        //fetch auth0 profile calls auth0, returns a profile object
        this.fetchAuth0Profile(id_token, function(profile){
          //format the profile for use in the DB
          let userProfile = {
            //username: profile
            username: profile.nickname,
            name : profile.name,
            email : profile.email,
            teacher: false,
            authid: profile.user_id
          };
          //set profile checks if the user is in the db
          this.setProfile(userProfile.authid, userProfile);
        }.bind(this));
        this.goToHome();
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
  }

  public fetchAuth0Profile (id_token: string, callback: Function) {
    return this.lock.getProfile(id_token, function(error, profile) {
      if (error) {
        alert(error);
      }
      callback(profile);
    });
  }

  public setProfile (authID: string, profile: Object) {
    // gets the user if they exist in the db---------->
     this.getUserFromDB(authID)
      .subscribe (
        response => {
          //this response will be 0 if they do not exist
          if (response.length === 0) {
              //this will then update the profile based on the info we got from google
              this.http.post('/api/users', profile)
                .subscribe (
                  response => {
                    this.http.put('/api/users/' + authID, profile)
                      .subscribe(
                        response => {
                          this.loginActions.setDataDispatch(profile);
                        }
                      );
                  }
                );
          } else {
           // If they do exist on the db
            console.log('user was found, not inserted', response);
            this.http.put('/api/users/' + authID, profile)
              .subscribe(
                response => {
                  return this.fetchDBProfile(authID);

                }
              );
            this.loginActions.setDataDispatch(response[0]);
            return response.data;
          }
        }
      );
  }

  public getUserFromDB(authID: string) {
    return this.http.get('/api/users/' + authID)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public fetchDBProfile(authID: string) {
    return this.http.get('/api/users/' + authID)
    .map(this.extractData)
    .catch(this.handleError);
  }

  public signUp(model, callback) {
    this.auth0.signup({
      connection: 'Username-Password-Authentication',
      responseType: 'code',
      username: model.email,
      password: model.password
    }, function(err, response) {
      if (err) return alert('something went wrong: ' + err.message);
      callback(response);
    });
  };

  public login(username, password, callback) {
    this.auth0.login({
      connection: 'Username-Password-Authentication',
      responseType: 'code',
      email: username,
      password: password,
    }, function(err, response) {
      if (err) alert('something went wrong: ' + err.message);
      localStorage.setItem('authID', response.idTokenPayload.sub);
      callback(response);
    });
  };

  public googleLogin() {
    this.auth0.login({
      connection: 'google-oauth2'
    }, function(err) {
      if (err) alert('something went wrong: ' + err.message);
    });
  };

  public goToHome() {
    return this.router.navigate(['/home']);
  }

  // Listening for the authenticated event
  public authenticated() {
    // Check if there's an unexpired JWT
    return tokenNotExpired();
  };

  public isAuthenticated() {
    // Check if there is an authentication key on state
    return this.ngRedux.getState().login.length>0;
  };

  public logout() {
    // Remove token from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('authID');
  };

  private extractData(res: Response) {
    let body = res.json();
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
