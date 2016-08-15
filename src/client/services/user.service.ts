import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Rx';
import { LoginActions } from '../actions/login.actions';

@Injectable()
export class UserService {
  userUrl : string = '/api/users/';
  updateUser : string = '/api/users/';
  constructor (
    private http: Http,
    private loginActions: LoginActions
    ) {}

  public getUserData(authID: string) {
    console.log('This getUserData function is so hot right now', authID);
    return this.http.get(this.userUrl + authID)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public setUserData(authID: string, userProfile : Object) {
    console.log('setUserData in UserService', arguments);
    return this.http.put(this.updateUser + authID, userProfile)
      .map(this.extractData)
      .catch(this.handleError);
  }

  public createTeacher(authID: string) {
    //generates a new teacher in the teachers DB
    this.http.post('/api/teaching/' + authID, authID)
    //responds with the rows generated
      .map(this.extractData)
      .subscribe (
        response => {
          //the object at 0 is an object containing all the added rows.
          //the property id is the new teacher id.
          let teacherid = response[0].id;
          //this will update the user data in the database
          this.setUserData(authID, {teacherid: teacherid})
            .subscribe(
              response => {
                // then fetch the updated data
                this.getUserData(authID)
                .subscribe (
                  response => {
                    //this sets the updated data to state
                    this.loginActions.setDataDispatch(response[0]);
                  }
                );
              }
            );
        }
      );
  }

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
