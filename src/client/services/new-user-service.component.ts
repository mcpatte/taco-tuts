import { Injectable }     from '@angular/core';
import { Http, Response } from '@angular/http';
import { User }           from '../components/sign-up/user';
import { Observable }     from 'rxjs/Observable';



@Injectable()
export class NewUserService {
  constructor (private http: Http) {}
  createUserUrl : string = '/api/users';
    
  createUser(userData: Object) {
    return this.http.post(this.createUserUrl, userData)
  }
}
