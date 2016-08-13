import { Injectable }      from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
import { Router }          from '@angular/router';
import { NgRedux }         from 'ng2-redux';
import { AUTH_VARS }       from '../auth0.variables.ts';
import { Http, Response } from '@angular/http';
import  { UserService } from './user.service'
import { Observable } from 'rxjs/Rx';


// Avoid name not found warnings
declare var Auth0: any;
declare var Auth0Lock: any;

@Injectable()
export class Auth {
  // Configure Auth0
  auth0 = new Auth0({
    domain: AUTH_VARS.AUTH0_DOMAIN,
    clientID: AUTH_VARS.AUTH0_CLIENT_ID,
    callbackOnLocationHash: true,
    callbackURL: process.env.AUTH0_CALLBACK_URL || window.location.origin
  });

/***********  WE NEED TO MAKE THIS A CONFIG VAR ******************/
  lock = new Auth0Lock(
    AUTH_VARS.AUTH0_CLIENT_ID,
    AUTH_VARS.AUTH0_DOMAIN
  );

  createUser = '/api/users/';

  constructor(
    private router: Router,
    private ngRedux: NgRedux<any>,
    private http: Http
  ) {


    /****** Constructor **********
     * result is from auth0. contains tokens.
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
      var result = this.auth0.parseHash(window.location.hash);
      if (result && result.idToken) {
        console.log('---------- AUTH O RESULT -----------', result);
        // this is the user's specific id
        let id_token = result.idToken;
        //set it to local storage for future use?
        localStorage.setItem('userData', result);
        console.log("constructor calling fetchAuth0Profile");
        //fetch auth0 profile calls auth0, returns a profile object
        this.fetchAuth0Profile(id_token, function(profile){
          console.log("Profile after fetchAuth0Profile, line 60 auth.service", profile)
          //format the profile for use in the DB
          let userProfile = {
            //username: profile
            username: profile.nickname,
            name : profile.name,
            email : profile.email,
            teacher: false,
            authid: profile.user_id
          }
          //set profile checks if the user is in the db
          this.setProfile(userProfile.authid, userProfile);
          this.getUserFromDB(userProfile.authid)
            .subscribe(
              response => {
                if (response.length > 0){

                }
              }
            )
        }.bind(this))
        this.goToHome();
      } else if (result && result.error) {
        alert('error: ' + result.error);
      }
  }

  public fetchAuth0Profile (id_token: string, callback: Function) {
    console.log("fetchAuth0Profile called")
    return this.lock.getProfile(id_token, function(error, profile) {
      if (error) {
        alert(error);
      }
      callback(profile)
      console.log("fetchAuth0Profile result", profile)
    });
  }

//********** BE AFRAID ***************//
/*
This monster of a function checks if the user exists
  if they do not, then it sets the auth id
  then it takes that auth id and updates the user profile
  with data received from the google login

  TODO: 

  -Refactor out individual pieces
  -Only set authID on sign up 
  -Only update user profile info on sign up

  -figure out why the fuck I can't see this shit in the DB
  -figure out how the fuck I can get this data outside of auth service 
   so I can set the user profile to state

*/

  public setProfile (authID: string, profile: Object) {
    console.log("setprofile called with authid: ", authID, ' and profile ', profile)
    // gets the user if they exist in the db---------->
    return this.getUserFromDB('/api/users/' + authID)
      .subscribe (
        user => {
          console.log("here's the response from the first function in set profile");
          //this response will be 0 if they do not exist
          if (user.length>0){
            console.log("User not found, inserting")
            console.log("set profile called, doing post request", profile);
            //If they do not exist, create the user
            //a post request to /api/users/ will return a single profile
            return this.http.post('/api/users', profile)
              .map(this.extractData)
              .subscribe(
                authID => {
                  //this will then update the profile based on the info we got from google
                  return this.http.put('/api/users/' + authID, profile)
                  .subscribe(
                    response => {
                      console.log("response from update user", response)
                      return this.fetchDBProfile(authID)
                      
                    }
                  )
                }
              )
          } else {
            // If they do exist on the db
            console.log('user was found, not inserted', user);
            return user;
          }
        }
      )
  }

  public getUserFromDB(authID: string){
    console.log('xxxxxxxxxxxx    getUserFromDB called')
    return this.http.get(this.createUser + authID)
      .map(this.extractData)
      .catch(this.handleError)
  }

  public fetchDBProfile(authID: string) {
    return this.http.get(this.createUser + authID)
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





// @Injectable()
// export class Auth {
//   // Configure Auth0
//   lock = new Auth0Lock('1fAOoxggMklnQahSLp7O9dYpEZryuprR', 'kylelinhardt.auth0.com', {});

//   constructor() {
//     // Add callback for lock `authenticated` event
//     this.lock.on('authenticated', (authResult) => {
//       localStorage.setItem('id_token', authResult.idToken);
//     });
//   }

//   public login() {
//     // Call the show method to display the widget.
//     this.lock.show();
//   };

//   public authenticated() {
//     // Check if there's an unexpired JWT
//     // It searches for an item in localStorage with key == 'id_token'
//     return tokenNotExpired();
//   };

//   public logout() {
//     // Remove token from localStorage
//     localStorage.removeItem('id_token');
//   };
// }
