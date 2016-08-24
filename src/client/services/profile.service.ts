import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProfileService {
  constructor (private http: Http) {}

  updateUser(userData: Object, authID: string) {
    return this.http.put('/api/users/' + authID, userData);
  }

  updateRate(userData){ 
    return this.http.put('/api/teachers/rate', userData)
  }

  getTeacherInfo(userID) {
    return this.http.get('/api/teachers/' + userID)
      .map(this.extractData)
      .catch(this.handleError);
  }

   private extractData(res: Response) {
    let body = res.json();
    console.log('BODY', body.data);
    return body.data || { };
  }

  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


}
