import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { User }           from '../components/user';
import { Observable }     from 'rxjs/Observable';



@Injectable()
export class NewUserService {
  constructor (private http: Http) {}
  createUserUrl : string = '/api/users';
    
  createUser = function(userData: Object) {
    return this.http.get(this.createUserUrl)
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log('in extract data', body.data);
    return body.data || { };
  }
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
